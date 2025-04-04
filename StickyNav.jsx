import { AppBar, Toolbar,Button ,Box} from '@mui/material';
import React, { useState } from 'react';

function StickyNav({setfilter}) {
    const navdata=['All','milk','butter','buttermilk','cheese','curd','cream','yogurt','ghee','paneer'];
    

  return (
    <Box sx={{flexGrow:1}}>
        <AppBar sx={{backgroundColor:"white",
                    top:'auto',
                    bottom:0,
                    height:'60px',
                    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
                    transition:'none',
                    animation:'none',
                    transform:'none'
                    }} 
                    position='fixed'>
        <Toolbar sx={{
            display: 'flex',
            backgroundColor:'#3A486E',
            alignItems:'center',
            justifyContent: {xs:'start',sm:'start',md:'center'},
            gap: '10px', // Space between buttons
            overflowX:'scroll', // Enable horizontal scrolling
            padding: '10px 16px', // Add padding for better touch accessibility
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}>
        {navdata.map((item)=>(
                    <Button key={item}
                        onClick={()=> setfilter(item)}
                        variant='contained' 
                        sx={{
                            backgroundColor:'#3A486E',
                            borderStyle:'solid',
                            borderColor:'white',
                            borderWidth:'2px',
                        color:'white',
                        maxWidth:'none',
                        width:'fit-content',
                        transition: 'none',
                        animation: 'none',
                        borderRadius: '5px',
                        fontSize:{xs:'9px',sm:'12px',md:'15px'},
                        '&:hover': {
                          backgroundColor: 'white',
                          color:'#3A486E'
                        },
                      }} >{item}
                      </Button>  
            ))}
            <Box sx={{minWidth:'16px'}}/>
            </Toolbar>
    </AppBar>
    </Box>
    
  )
}

export default StickyNav