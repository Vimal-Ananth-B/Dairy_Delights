import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Card, CardContent, CardActions,CardMedia, IconButton, Grid ,Modal, Grid2} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useCart } from './CartContext';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, calculateTotal,clearcart, openPopup, message, closePopup } = useCart();

  const navigate=useNavigate();
  const gotoshop=()=>{
    navigate('/');
  }
  const gotoform=()=>{
    navigate("/form");
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "#f6f6f6", transition: 'none', animation: 'none', transform: 'none' }} position='static'>
          <Toolbar>
            <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: '#3A486E' }} onClick={gotoshop} />
            <Typography component="div" sx={{ flexGrow: 1, color: '#2a9df4', transition: 'none', animation: 'none', transform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h6' sx={{ color: '#3A486E', transition: 'none', animation: 'none' }}>
                Your Cart
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
              }} onClick={clearcart}>
              Clear Cart
            </Button>
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
              }} onClick={gotoshop}>
              Back to Shop
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      
 <Grid2 
    id='scrollsection'
    container
    spacing={2}
    sx={{
      backgroundColor:'#F6F6F6',
        display: "grid", // Use CSS grid
        gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // 1 column on small screens
            sm: "repeat(3, 1fr)", // 2 columns on small screens
            md: "repeat(4, 1fr)", // 3 columns on medium screens
          },
        gridAutoRows: "minmax(100px, auto)", // Define row height
        gap: 2, // Gap between grid items
        padding: { xs: 2, sm: 4, md: 6 }, // Adjust padding for different screen sizes
    }}
  >
      {
        (cart.length===0)?<Typography>Your Cart is empty add items</Typography>:
      cart.map((item) => (
        <Grid2
        key={item.id}
        sx={{
          gridColumn: "span 1", // Default to one column
          gridRow: item.aspectRatio === "9:16" ? "span 2" : "span 1", // Tall images span two rows
          maxWidth:'300px',
          backgroundColor:'#F6F6F6',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'space-around',
        }}
        >
          <Card key={item.id} sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          backgroundColor:'#F6F6F6',
        }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.productName}
            sx={{
              height: "100%",
              objectFit: "cover",
            }}
          />
          <CardContent sx={{
                position: "absolute",
                bottom: 40,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "black",
                padding: { xs: 0.2, sm: 0.5 },
              }}>
            <Typography gutterBottom={true} variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" },color:'white' }}>{item.productName}</Typography>
            <Typography gutterBottom={true} variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" },color:'white' }}>Price: {item.price}</Typography>
            <Typography gutterBottom={true} variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" },color:'white' }}>
              Quantity:
              <Button gutterBottom={true} variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" },color:'white' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
              {item.quantity}
              <Button gutterBottom={true} variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" },color:'white' }} onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                -
              </Button>
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton sx={{color:'red'}} onClick={() => removeFromCart(item.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
        </Grid2>
        
      ))}
      {/* Popup */}
      <Modal open={openPopup} onClose={closePopup}>
        <Box>
          <Typography>{message}</Typography>
          <Button onClick={closePopup}>Close</Button>
        </Box>
      </Modal>
      </Grid2>

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
            justifyContent:'flex-end',
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
            <DoubleArrowIcon/>
            <DoubleArrowIcon/>
            <DoubleArrowIcon/>
            <Typography sx={{fontSize:{xs:'20px',md:'25px',sm:'20px',lg:'25px'}}}>Total:{calculateTotal()}</Typography>
                    <Button size='small'
                        variant='contained' 
                        sx={{
                            backgroundColor:'#3A486E',
                            borderStyle:'solid',
                            borderColor:'white',
                            borderWidth:'2px',
                        color:'white',
                        maxWidth:'250px',
                        width:'fit-content',
                        height:'fit-content',
                        transition: 'none',
                        animation: 'none',
                        borderRadius: '5px',
                        fontSize:{xs:'9px',sm:'12px',md:'15px'},
                        '&:hover': {
                          backgroundColor: 'white',
                          color:'#3A486E'
                        },
                      }} >
                        <Typography style={{'&:hover': {
                          backgroundColor: 'white',
                          color:'#3A486E'
                        },}} onClick={gotoform}>Seal the Deal</Typography>
                      </Button>  
            <Box sx={{minWidth:'16px'}}/>
            </Toolbar>
    </AppBar>
    </Box>
    </div>
  );
}


