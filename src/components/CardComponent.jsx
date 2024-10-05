import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const CardComponent = ({item,onEdit,onDelete}) => {
  
  const [iconVisible, setIconVisible]=useState(false)/* for icon visibility */
  return (
   <Card sx={{position:"relative",height:360}}
              onMouseEnter={()=>setIconVisible(true)}  /* when we hover on the card we see the icon */
              onMouseLeave={()=>setIconVisible(false)}
              elevation={3}  >

                <CardHeader
                 title={item.name}
                 sx={{ color: 'dodgerblue', textAlign: 'center' }}/>
                <CardMedia
                component="img"
                image={item.image}
          alt={item.name}
          title={item.name}
          sx={{ height: 250, width: 250, objectFit: 'contain', mx: 'auto', p: 2 }}
          />
          {item?.phone&&(
            <CardContent>
              <Typography>{item.phone}</Typography>
            </CardContent>
          )}
         <Box 
         sx={{position:"absolute",
          top:10,
          right:10,
          display:"flex",
          gap:1,
          //visibility: iconVisible ?  "visible" :"hidden"
          opacity: iconVisible ? 1 : 0 , /* to see the icon or not */
          transition: 'opacity all 0.3s ease-in-out',
         }}> 
            <EditIcon sx={{ color: 'orange', cursor: 'pointer' }}
                           onClick={()=> onEdit(item)}/>
         <DeleteOutlineIcon  sx={{ color: 'red', cursor: 'pointer' }}
                   onClick={() => onDelete(item._id)} />


         </Box>
   </Card>
  )
}
CardComponent.propTypes = {
  item: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardComponent;