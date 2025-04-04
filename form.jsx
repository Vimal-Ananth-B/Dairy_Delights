import {React,useState,useEffect} from 'react';
import {Box,Typography,Button,AppBar,Toolbar,TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import formValidation from './formValidation';
import HomeIcon from '@mui/icons-material/Home';
import { useCart } from './CartContext';
import axios from 'axios';


function form() {
    const navigate=useNavigate();
    const{cart,email,setEmail,username,setUsername,
      password,
      setPassword,
      confirmPassword,
      id,setId,clearcart,
      setConfirmPassword,calculateTotal}=useCart();
    const gotocart=()=>{
        navigate('/cart');
    }
    const gotoshop=()=>{
        navigate('/');
    }

    const [formValue, setFormValue] = useState({
      PhoneNumber: '',
      DeliveryDate: '',
      Address: '',
      City: '',
      State: '',
      ZipCode: '',
    });
    const [errors, setErrors] = useState({});
    const totalAmount=calculateTotal();


    const handleChange = (e) => {
      const tempData = { ...formValue, [e.target.name]: e.target.value };
      setFormValue(tempData);
      const tempError = formValidation(tempData);
      console.log('Validation Errors:', tempError); 
      setErrors(tempError);
    };

    const handleSubmit=(e)=>{
      e.preventDefault();
      const tempObj = formValidation(formValue);
      setErrors(tempObj);

      if (Object.keys(tempObj).length === 0) {
        const orderDetails={
          id:id,
          UserName:username,
          Email:email,
          Password:password,
          ConfirmPassword:confirmPassword,
          ...formValue,
          cart,
        total:calculateTotal(),
      };
      console.log(orderDetails);
        axios.put(`https://67e2805297fc65f53536634d.mockapi.io/mockapi/users/usersData/${id}`, orderDetails)
        .then((response)=>{
          console.log('Order Response:', response.data); 
          alert('Order placed successfully Shop more!');
        clearData();
        gotoshop();
        clearcart();
        })
        .catch( (error)=> {
        console.error('Error submitting order:', error);
        alert('Error placing the order. Please try again.');
      });
    }
    };

    const clearData = () => {
      setFormValue({
        PhoneNumber: '',
        DeliveryDate: '',
        Address: '',
        City: '',
        State: '',
        ZipCode: '',
      });
      setErrors({});
      
    };
  return (
    <div><Box sx={{ flexGrow: 1 }}>
    <AppBar sx={{ backgroundColor: "#f6f6f6", transition: 'none', animation: 'none', transform: 'none' }} position='static'>
      <Toolbar>
        <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: '#3A486E' }} onClick={gotoshop} />
        <Typography component="div" sx={{ flexGrow: 1, color: '#2a9df4', transition: 'none', animation: 'none', transform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h6' sx={{ color: '#3A486E', transition: 'none', animation: 'none' }}>
            Fill the Details
          </Typography>
        </Typography>
        <Button
          sx={{
            color: "white",
            backgroundColor: '#3A486E',
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
          }} onClick={gotocart}>
          Back to Cart
        </Button>
      </Toolbar>
    </AppBar>
    {(totalAmount>0)?(
    <form onSubmit={handleSubmit}>
    <Typography variant="h4" component="h4" gutterBottom sx={{ fontWeight:'bold'}}>
            {username}
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom>
            Rs:{calculateTotal()}
          </Typography>
            <Typography variant="h6" gutterBottom>
              Help us to reach you...!
            </Typography>

            <TextField
              fullWidth
              name="PhoneNumber"
              label="Phone Number*"
              type="number"
              value={formValue.PhoneNumber}
              onChange={handleChange}
              error={!!errors.PhoneNumber}
              helperText={errors.PhoneNumber}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              name="Address"
              label="Address"
              value={formValue.Address}
              onChange={handleChange}
              error={!!errors.Address}
              helperText={errors.Address}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              name="City"
              label="City"
              value={formValue.City}
              onChange={handleChange}
              error={!!errors.City}
              helperText={errors.City}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              name="State"
              label="State"
              value={formValue.State}
              onChange={handleChange}
              error={!!errors.State}
              helperText={errors.State}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              name="ZipCode"
              label="Zip Code"
              type="number"
              value={formValue.ZipCode}
              onChange={handleChange}
              error={!!errors.ZipCode}
              helperText={errors.ZipCode}
              sx={{ mb: 2 }}
            />

<TextField
              fullWidth
              name="DeliveryDate"
              label="Delivery Date"
              type="date"
              value={formValue.DeliveryDate}
              onChange={handleChange}
              error={!!errors.DeliveryDate}
              helperText={errors.DeliveryDate}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button variant="contained" color="error" onClick={clearData}>
                RESET
              </Button>
              <Button type="submit" variant="contained" color="primary" >
                SUBMIT
              </Button>
            </Box>
    </form>):(<Typography variant='h6' sx={{ color: '#3A486E', transition: 'none', animation: 'none' }}>Make purchase first your cart is empty</Typography>)}
  </Box></div>
  )
}

export default form;