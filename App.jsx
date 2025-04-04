import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { CartProvider } from './Components/Cartpage/CartContext.jsx';
import {Box,Typography} from "@mui/material";
import Login from './Components/LoginPage/Login.jsx';
import Logintwo from './Components/LoginPage/Logintwo.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Cart from './Components/Cartpage/Cart.jsx';
import Form from './Components/Cartpage/form.jsx';
import AdminOrderDetails from './admin/adminOrderDetails.jsx';
import AdminLogin from './admin/adminLogin.jsx';
import AuthContext,{AuthProvider} from './admin/AuthContext.jsx';
import ContentDisplay from './Components/Contentblock/ContentDisplay.jsx';

function App() {
  return (
    <AuthProvider> 
    <CartProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navbar/>}/>
    <Route path="/contentDisplay" element={<ContentDisplay/>}/>
    <Route path="/signup" element={<Login/>}/>
    <Route path="/login" element={<Logintwo/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path='/form' element={<Form/>}/>
    <Route path='/admin-login' element={<AdminLogin/>} /> 
    <Route path='/admin-order-details' element={<AdminOrderDetails/>} /> 
    </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}

export default App