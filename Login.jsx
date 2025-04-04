import React, { useContext, useState } from 'react';
import { Typography,Box,Grid2, TextField ,Stack, Button, Checkbox, FormControlLabel,AppBar,Toolbar } from '@mui/material';
import './Login.css';
import Profile from './images/home5.webp';
import {Link} from "react-router-dom";
import LoginValidation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useCart } from '../Cartpage/CartContext';
import AuthContext from '../../admin/AuthContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Login() {
  const[formdata,setformdata]=useState({
    UserName:'',
    Email:'',
    Password:'',
    ConfirmPassword:'',
  });
  const{username,setUsername,email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  id,
setId,
makemelogin,
makemelogout}=useCart();

   

  const[showpassword,setshowpassword]=useState(false);

  const[errors,seterrors]=useState({});

    const handleChange=(e)=>{
      let tempdata={...formdata,[e.target.name]:e.target.value};
      setformdata(tempdata);
      let temperror=LoginValidation(tempdata);
      seterrors(temperror);
    }

    const handleSubmit=async (e)=>{
      e.preventDefault();
      try{
        console.log("Form Submitted");
      let errorobj=LoginValidation(formdata);
      seterrors(errorobj);
      if(Object.keys(errorobj).length===0)
      {
        // let response=await axios.get("http://localhost:3003/users");
        let response=await axios.get("https://67e2805297fc65f53536634d.mockapi.io/mockapi/users/usersData");
        let users=response.data;

        let nextId=1;
        if (users.length > 0) {
          nextId = Math.max(...users.map(user => parseInt(user.id))) + 1;  // Find max ID and increment it
        }
        let user=users.find((user)=> user.Email===formdata.Email);
        if(!user)
        {
          const newUser = {
            id: nextId.toString(),  // Use sequential ID
            UserName: formdata.UserName,
            Email: formdata.Email,
            Password: formdata.Password,
            ConfirmPassword: formdata.ConfirmPassword,
          };
  
          // Send request to save new user
          // await axios.post("http://localhost:3003/users", newUser);
          await axios.post("https://67e2805297fc65f53536634d.mockapi.io/mockapi/users/usersData", newUser);
          // Set context/state for logged-in user
          setId(nextId);
          setUsername(formdata.UserName);
          setEmail(formdata.Email);
          setPassword(formdata.Password);
          setConfirmPassword(formdata.ConfirmPassword);
  
          alert("Hurrah, you have signed up successfully!");
          cleardata();  // Reset data
          setTimeout(gotologin, 1000);  // Redirect to login
        } else {
          alert("You are already signed up.");
        }
        }
        else{
          window.alert("You are already siggned up");
        }
      }
      catch(error)
      {
        console.error("Error occured",error);
        window.alert("Error occured...!");
        if(error.response)
        {
          console.error("error occured with ",error.response.data);
        }
      }
    };

    const cleardata=() => {
      setformdata({
        UserName:'',
        Email:'',
        Password:'',
        ConfirmPassword:'',
      })
    }

    const navigate=useNavigate();
  const gotoshop=()=>{
    navigate('/');
  }
  const gotologin=()=>{
    navigate('/login');
  }
  const gotoadminlogin=()=>{
    navigate("/admin-login");
  }
  return (
    <div><AppBar sx={{ transition: 'none', animation: 'none', transform: 'none',background:'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' }} position='static'>
    <Toolbar>
      <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: '#fc6c85' }} onClick={gotoshop} />
      <Typography component="div" sx={{ flexGrow: 1, color: '#2a9df4', transition: 'none', animation: 'none', transform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ color: 'black', transition: 'none', animation: 'none' }}>
          SignupPage
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
    <Box className='background'sx={{background:'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'}}>
        <Grid2 className="grid-container" container columns={12}>
        <Grid2 className="grid-item image-section" item={true} xs={12} sm={6} md={6} lg={6} display={'flex'} justifyContent={'center'} alignItems={'center'} marginBottom={'50px'}>
            <Box component='img' sx={{width:'70%',height:'90%',display:'flex',justifyContent:'center',alignItems:'center'}} src={Profile}>
            </Box>
        </Grid2>
        <Grid2 className="grid-item form-section" item={true} xs={12} sm={6} md={6} lg={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <form className="login" onSubmit={handleSubmit}>
        <Box className="form-container" sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <Stack className="form-stack" sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <Typography className='Loginheading' variant='h5' gutterBottom>Farm Products Welcomes you...!</Typography>
          <Typography className="signup-heading" variant='h5'>Sign Up...!</Typography>
          <Typography className="text-muted" sx={{fontStyle:'text-muted',marginBottom:'20px'}} gutterBottom>Please enter your details below</Typography>
            <TextField className="form-input" fullWidth={true} sx={{marginBottom:'20px'}} name="UserName" value={formdata.UserName} label={'UserName*'} onChange={handleChange} error={!!errors.UserName} helperText={errors.UserName} variant={'standard'} ></TextField>
            <TextField className="form-input" fullWidth={true} sx={{marginBottom:'20px'}} name='Email' value={formdata.Email} label={'Email*'} onChange={handleChange} error={!!errors.Email} helperText={errors.Email} variant={'standard'} ></TextField>
            <TextField className="form-input" fullWidth={true} sx={{marginBottom:'20px'}} name='Password' value={formdata.Password} label={'Password*'} onChange={handleChange} error={!!errors.Password} helperText={errors.Password} type={showpassword ? 'text' : 'password'} variant={'standard'} ></TextField>
            <TextField className="form-input" fullWidth={true} sx={{marginBottom:'20px'}} name='ConfirmPassword' value={formdata.ConfirmPassword} onChange={handleChange} error={!!errors.ConfirmPassword} helperText={errors.ConfirmPassword} label={'ConfirmPassword*'} type={showpassword ? 'text' : 'password'} variant={'standard'} ></TextField>
            <FormControlLabel className="checkbox-label" label="Show password" required control={<Checkbox checked={showpassword} onChange={() => setshowpassword(!showpassword)}/>}/>
            <Button className="submit-button" sx={{marginBottom:'40px',backgroundColor:'#fc6c85'}} variant='contained' onClick={handleSubmit}>Sign Up</Button>
            <Typography>If you already have a account...?<Button className="login-link"><Link to="/login" sx={{color:'#fc6c85'}}>Login here</Link></Button></Typography>
          </Stack>
            </Box>
        </form>
        </Grid2>
        </Grid2>
    </Box>
    </div>
  )
}