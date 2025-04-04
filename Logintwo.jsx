import React, { useState,useEffect, useContext } from 'react';
import { Typography,Box,Grid2, TextField ,Stack, Button, Checkbox, FormControlLabel,AppBar,Toolbar } from '@mui/material';
import './Login.css';
import {Link} from "react-router-dom";
import Profile from './images/home5.webp';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cartpage/CartContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Logintwo() {

  const { makemelogin,makemelogout,loggedIn,setUsername,setId } = useCart();
  const navigate=useNavigate();
    const gotoshop=()=>{
      navigate('/');
    } 
    const gotoadminlogin=()=>{
      navigate("/admin-login");
    }

    useEffect(()=>{
      if(loggedIn){
        navigate('/');
      }
    },[loggedIn,navigate]);

  const[formtwodata,setformtwodata]=useState({
    Email:"",
    Password:"",
  });

  


  const[showpassword,setshowpassword]=useState(false);

  const handleevent=(e)=>{
    setformtwodata({...formtwodata,[e.target.name]:e.target.value});
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      // let response=await axios.get("http://localhost:3003/users");
      let response=await axios.get("https://67e2805297fc65f53536634d.mockapi.io/mockapi/users/usersData");
      let users=response.data;

      let user=users.find((user)=> {return user.Email===formtwodata.Email});
      if(user)
      {
        if(user.Password===formtwodata.Password)
        {
          setUsername(user.UserName);  // Access the username here
        setId(user.id); 
          makemelogin();
          window.alert("Your login is successfull");
          gotoshop();
        }
        else 
        {
          window.alert("Your Password is incorrect");
        }
      }
      else 
      {
        window.alert("This email id is not siggned up yet,Please sign up first");
      }
    }
    catch(error)
    {
      console.error("Error in fetching users:",error);
      window.alert("An error occured.Please try again later");
    }
  };

  

  return (
    <div>
      <AppBar sx={{ transition: 'none', animation: 'none', transform: 'none',background:'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' }} position='static'>
    <Toolbar>
      <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: '#fc6c85' }} onClick={gotoshop} />
      <Typography component="div" sx={{ flexGrow: 1, color: '#2a9df4', transition: 'none', animation: 'none', transform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ color: 'black', transition: 'none', animation: 'none' }}>
          LoginPage
        </Typography>
      </Typography>
      <AdminPanelSettingsIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: '#fc6c85' }} onClick={gotoadminlogin}/>
      <Button
        sx={{
          color: "black",
          backgroundColor: '#fc6c85',
          maxWidth: 'none',
          width: 'fit-content',
          marginRight: '20px',
          transition: 'none',
          animation: 'none',
          borderRadius: '10px',
          fontSize: { xs: '8px', sm: '10px', md: '15px' },
          '&:hover': {
            backgroundColor: 'white',
            color: '#3A486E'
          }
        }} onClick={gotoshop}>
        Back to Shop
      </Button>
    </Toolbar>
  </AppBar>
    <Box className='background' sx={{background:'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'}}>
        <Grid2 container columns={12}>
        <Grid2 item xs={12} sm={6} md={6} lg={6} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <Box component='img' sx={{width:'70%',height:'90%',display:'flex',justifyContent:'center',alignItems:'center'}} src={Profile}>
            </Box>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={6} lg={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <form onSubmit={handleSubmit}>
        <Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <Stack sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <Typography className='Loginheading' variant='h5' gutterBottom>Welcome back...!</Typography>
          <Typography className='Loginheading' variant='h5' gutterBottom>Sign In...!</Typography>
          <Typography className='Loginheading' sx={{fontStyle:'text-muted',marginBottom:'40px'}} gutterBottom>Please enter your details below</Typography>
            <TextField  fullWidth={true} name='Email' sx={{marginBottom:'20px'}} label={'Email*'} variant={'standard'} value={formtwodata.Email} onChange={handleevent}></TextField>
            <TextField  fullWidth={true} name='Password' sx={{marginBottom:'20px'}} label={'Password*'} variant={'standard'} value={formtwodata.Password} onChange={handleevent} type={showpassword?'text':'password'}></TextField>
            <FormControlLabel label="Show Password" required control={<Checkbox checked={showpassword} onChange={()=> setshowpassword(!showpassword)}></Checkbox>}></FormControlLabel>
            <Button sx={{marginBottom:'40px',backgroundColor:'#fc6c85'}} variant='contained' onClick={handleSubmit}  >Login</Button>
            <Typography>If you not already have a account...?<Button><Link to="/signup" sx={{color:'#fc6c85'}}>Sign Up</Link></Button></Typography>
          </Stack>
            </Box>
        </form>
        </Grid2>
        </Grid2>
    </Box>
    </div>
  )
}