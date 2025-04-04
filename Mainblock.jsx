import React from 'react';
import {Grid2,Box,Typography} from '@mui/material';
import mainblockimg from './images/mainorg.png';
function Mainblock() {
  function scrollTo(){
    const section=document.getElementById("scrollsection");
    if(section)
    {
      section.scrollIntoView({behavior:'smooth',block:'start'});
    }
  };
  return (
    <Box sx={{width:'100%',
      height:'100%',
              marginTop:'0px',
              display:'flex',
              justifyContent:'center',
              transition:'height 0.3s ease',
              transform:'none',
              animation:'none',
              alignItems:'center',
              overflow:'hidden',
              position:'relative',
              // backgroundColor:'#85EFFF',
              backgroundColor:'#f6f6f6',
              }}>
        <Grid2 container columns={12}>
            <Grid2 item xs={12} sm={12} md={12} lg={12} display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            transition: 'none',
            transform: 'none', 
            animation: 'none', 
          }}>
                <Box component='img' 
                sx={{width:'100%',
                height:'auto',
                transition:'height 0.3s ease',
                transform:'none',
                animation:'none',
                objectFit:'cover'}} 
                src={mainblockimg} 
                onClick={scrollTo}></Box>
            </Grid2>

        </Grid2>
    </Box>
  )
}

export default Mainblock