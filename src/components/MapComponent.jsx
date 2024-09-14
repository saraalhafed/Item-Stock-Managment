import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; /* important for map style */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import geocodeAddress from '../helper/geocodeAddress';
import { Card, CardHeader, CardMedia } from '@mui/material';
//const position = [51.505, -0.09] /* center in london  from react leaflet page*/
const position = [52.3759, 9.732];/* to center the map on hanover */
 const MapComponent = () => {

    const firms= useSelector((state)=> state.firms.data);
    const [positions,setPositions]= useState({}) /* to collect all the positions (converted adresses)of the firms adresses */
   /* to generate position for all the adresses , everytime we create afirm we convert the address to position */
    useEffect(()=>{
     const getPositons =async(adress)=>{
            const newPosition={};
            for (const firm of firms){
                   const coords = await geocodeAddress(firm.address)
           
            if (coords) newPosition[firm._id]= coords;
        }
        setPositions(newPosition)
             
 }
 getPositons(); /* to see the position when the page render*/
},[firms])

  return (  /* to apear this map we need a style  */
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}
    style={{ height: '70vh', width: '100%' }}> {/* add this part */}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {firms.map(
        (item,index)=>
          positions[item._id]&&( /* we check the state wich has all the firm-id [lat,lon] */
     <Marker  key={index} position={positions[item._id]}>
      <Popup>
        <Card>
             <CardHeader title={item.name}/>
             <CardMedia
             component="img"
             src={item.image}
             height={100}
             title={item.name}
             alt={item.name}
             sx={{objectFit:"cover"}}
             />
        </Card>
      </Popup>
    </Marker>
          
    ))}
    
  </MapContainer>
  )
}

export default MapComponent;