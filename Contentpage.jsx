import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Card,Grid2} from '@mui/material';
import {CardActions } from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia} from '@mui/material';
import {Button,Modal} from '@mui/material';
import {Typography,Box} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useCart } from '../Cartpage/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import data from '../data/db.json';



function Contentpage({filter}) {
  const { addToCart, openPopup, message, closePopup,loggedIn } = useCart();
  const navigate=useNavigate();
  const gotodisplay=(item)=>{
     navigate("/contentDisplay",{ state: {selectedItem:item} });
    console.log(selectedItem);
  }
    const [contentdata,setcontentdata]=useState([]);

    useEffect(()=>{
        const fetchcontentdata=async()=>{
            try{
                const response=await axios.get("https://67e2df3c97fc65f53537f385.mockapi.io/dairy/products/productData");
                setcontentdata(response.data);
            }
            catch(error)
            {
                console.error("Error in fetching data from DB JSON");
            }
        };
        fetchcontentdata();
        // setcontentdata(data.products);
    },[]);

    
    const tempfilter=filter;

    const temp2filter=tempfilter==='All'?contentdata:contentdata.filter((item)=> { return item.category.toLowerCase().includes(tempfilter.toLowerCase())});
  return (
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
    {temp2filter.map((item) => (
      <Grid2
      key={item.id}
      sx={{
        gridColumn: "span 1", // Default to one column
        gridRow: item.aspectRatio === "9:16" ? "span 2" : "span 1", // Tall images span two rows
        maxWidth:'300px',
        backgroundColor:'#F6F6F6'
      }}
      >
        <Card   sx={{
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
            onClick={()=> gotodisplay(item)}
          />
          <CardContent
            sx={{
                position: "absolute",
                bottom: 40,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "black",
                padding: { xs: 0.2, sm: 0.5 },
              }}
          >
            <Typography gutterBottom={true} variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" },color:'white' }}>
              {item.productName}:<CurrencyRupeeIcon variant="rounded" sx={{fontSize: { xs: "1rem", sm: "1.25rem" }}}/><span sx={{fontSize: { xs: "0.75rem", sm: "1rem" }}}>{item.price}</span>
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: { xs: "0.75rem", sm: "1rem" },color:'white' }}>
              {item.description}
            </Typography>
          </CardContent>
          <CardActions sx={{marginTop:'20px',paddingTop:'20px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <ShoppingCartIcon variant="filled" sx={{fontSize: { xs: "1rem", sm: "1.25rem" },color:'#3A486E'}} onClick={()=> gotodisplay(item)}/>
          <AddCommentIcon variant="filled" sx={{fontSize: { xs: "1rem", sm: "1.25rem" ,color:'#3A486E'}}} onClick={() => (loggedIn)?addToCart(item):alert("Login to shop...!")} />
          </CardActions>
        </Card>
      </Grid2>
    ))}
    {/* Add to Cart Popup */}
    <Modal open={openPopup} onClose={closePopup}>
        <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: '8px', width: {lg:'300px',md:'250px',sm:'200px',xs:'150px'}, margin: 'auto', marginTop: {xs:'50%',sm:'50%',md:'20%',lg:'20%'} }}>
          <Typography variant="h6">{message}</Typography>
          <Button onClick={closePopup} variant="contained" sx={{ marginTop: 2 }}>Close</Button>
        </Box>
      </Modal>
  </Grid2>
  )
}

export default Contentpage