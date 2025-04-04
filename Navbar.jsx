import React, { useState,useEffect } from 'react';
import Mainblock from '../Mainblock/Mainblock.jsx';
import { Stack,Box,AppBar,Toolbar, Typography,Button,Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logoimage from './images/logo10.png';
import Contentpage from '../Contentblock/Contentpage.jsx';
import StickyNav from '../StickyNavbar/StickyNav.jsx';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cartpage/CartContext.jsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Navbar() {
  const { loggedIn,makemelogout,username } = useCart();
    const[filter,setfilter]=useState('All');
    const { cart } = useCart();
    const navigate=useNavigate();
    function scrollTo(){
        const section=document.getElementById("scrollsection");
        if(section)
        {
          section.scrollIntoView({behavior:'smooth',block:'start'});
        }
      };

      
      const gotocart=()=>{
        navigate('/cart');
      }
      const gotologin=()=>{
        navigate('/login');
      }
  return (
      <div>
        <div>
            <Box sx={{flexGrow:1}}>
                <AppBar sx={{backgroundColor:"#f6f6f6",transition:'none',animation:'none',transform:'none'}} position='relative' >
                    <Toolbar>
                        <Box component='img' src={logoimage} sx={{
        maxWidth:'50px',
      transition:'none',animation:'none',transform:'none',backgroundColor:'#f6f6f6'}}></Box>
                        <Typography component="div" sx={{flexGrow:1,color:'#2a9df4',transition:'none',animation:'none',transform:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <Typography variant='h6' sx={{color:'#3A486E',transition: 'none', animation: 'none' }}>
                            Dairy Delights
                        </Typography>
                        </Typography>
                        {(loggedIn)?<Box sx={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><Stack sx={{ 
  display: 'flex', 
  flexDirection: 'column', // Make the layout stack vertically
  alignItems: 'center',
  justifyContent: 'center',
}} ><AccountCircleIcon  sx={{
  marginRight:'20px',
  color: '#3A486E',
  transition: 'none',
  maxWidth: 'none',
  width: '30px', // Adjust icon size as needed
  height: '30px', // Adjust icon size as needed
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: 'white',
    color: '#3A486E'
  }
}} /><Typography color='#3A486E' sx={{ fontSize: '14px',marginRight:'20px',fontWeight: 'bold' }}>{username}</Typography></Stack><Button 
                           sx={{color:"white",
                           backgroundColor:'#3A486E',
                           transition: 'none', 
                           maxWidth:'none',
                           width:'fit-content',
                           animation: 'none',
                           fontSize:{xs:'8px',sm:'10px',md:'15px'},
                           marginRight:'20px',
                           borderRadius:'10px',
                           '&:hover': {
                             backgroundColor: 'white',
                             color:'#3A486E'}
                              }}
                              onClick={makemelogout}>
                               Logout
                           </Button>
                           </Box>:
                        <Button 
                        sx={{color:"white",
                        backgroundColor:'#3A486E',
                        transition: 'none', 
                        maxWidth:'none',
                        width:'fit-content',
                        animation: 'none',
                        fontSize:{xs:'8px',sm:'10px',md:'15px'},
                        marginRight:'20px',
                        borderRadius:'10px',
                        '&:hover': {
                          backgroundColor: 'white',
                          color:'#3A486E'}
                           }}
                           onClick={gotologin}>
                            Login
                        </Button>
}
                        
                        <Button
                        sx={{color:"white",
                            backgroundColor:'#3A486E',
                            maxWidth:'none',
                        width:'fit-content',
                        marginRight:'5px',
                        fontSize:{xs:'8px',sm:'10px',md:'15px'},
                            transition: 'none', 
                            animation: 'none',
                            borderRadius:'10px',
                            '&:hover': {
                              backgroundColor: 'white',
                              color:'#3A486E'}
                               }}
                               onClick={gotocart}>
                            Go To Cart
                        </Button>
                        <Badge badgeContent={cart.length} sx={{color:"#3A486E"}} onClick={gotocart}>
                <ShoppingCartIcon />
              </Badge>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
          <div>
              <Mainblock/>
              <Contentpage filter={filter} />
              <StickyNav setfilter={setfilter}/>
          </div>
      </div>
  )
}

export default Navbar