import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid, AppBar, Toolbar, Box } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useLocation } from 'react-router-dom';
import { useCart } from '../Cartpage/CartContext.jsx'; // Import addToCart from CartContext
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function ContentDisplay() {
  const location = useLocation();
  const { selectedItem } = location.state || {};
  const { addToCart, loggedIn } = useCart(); // Get addToCart and loggedIn from CartContext
  const navigate=useNavigate();
  const gotocart=()=>{
    navigate('/cart');
  }
  const gotoshop=()=>{
    navigate('/');
  }

  if (!selectedItem) {
    return <Typography variant="h6">No item selected</Typography>;
  }

  const handleAddToCart = () => {
    if (loggedIn) {
      addToCart(selectedItem);
      window.alert("added to cart");
    } else {
      alert("Please log in to add to cart!");
    }
  };

  const renderContent = () => (
    <>
      <Typography component="div" variant="h5">
        {selectedItem.productName}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        <strong>Price:</strong> ₹{selectedItem.price}
      </Typography>
      <Typography variant="body2" component="div">
        <strong>Nutritional Value:</strong> {selectedItem.nutritionalValue}
      </Typography>
      <Typography variant="body2" component="div">
        <strong>Description:</strong> {selectedItem.description}
      </Typography>
    </>
  );

  return (
    <div>
        <AppBar sx={{ transition: 'none', animation: 'none', transform: 'none',background:'white' }} position='static'>
    <Toolbar>
      <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: '#fc6c85' }} onClick={gotoshop} />
      <Typography component="div" sx={{ flexGrow: 1, color: '#2a9df4', transition: 'none', animation: 'none', transform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' sx={{ color: 'black', transition: 'none', animation: 'none' }}>
          Display Page
        </Typography>
      </Typography>
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
        }} onClick={gotocart}>
        To Cart
      </Button>
    </Toolbar>
  </AppBar>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid container spacing={2}>
          {/* Large Screen Layout */}
          <Grid item xs={12} sm={6} md={4}>
            <CardMedia
              component="img"
              height="400"
              sx={{ width: '100%', objectFit: 'cover' }}
              image={selectedItem.image}
              alt={selectedItem.productName}
            />
          </Grid>

          {/* Content and Add to Cart button */}
          <Grid item xs={12} sm={6} md={8}>
            <CardContent sx={{ flex: '1 0 auto' }}>{renderContent()}</CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: '#3A486E',
                  color: 'white',
                  '&:hover': { backgroundColor: 'white', color: '#3A486E' },
                }}
                onClick={handleAddToCart} // Trigger addToCart on button click
              >
                Add to Cart
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>

      {/* Footer Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: 'white',
            top: 'auto',
            bottom: 0,
            height: '60px',
            boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
          }}
          position="fixed"
        >
          <Toolbar
            sx={{
              display: 'flex',
              backgroundColor: '#3A486E',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px', // Space between buttons
              padding: '10px 16px',
            }}
          >
            <DoubleArrowIcon />
            <DoubleArrowIcon />
            <DoubleArrowIcon />
            <Typography
              sx={{
                fontSize: { xs: '20px', sm: '25px' },
                color: 'white',
                marginRight: 'auto',
              }}
            >
            </Typography>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: '#3A486E',
                border: '2px solid white',
                color: 'white',
                maxWidth: '250px',
                width: 'fit-content',
                borderRadius: '5px',
                fontSize: { xs: '9px', sm: '12px', md: '15px' },
                '&:hover': { backgroundColor: 'white', color: '#3A486E' },
              }}
              onClick={handleAddToCart} // Add to cart functionality
            >
              Add to Cart
            </Button>
            <Box sx={{ minWidth: '16px' }} />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default ContentDisplay;
