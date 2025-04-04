import React, { createContext, useState, useContext } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const[id,setId]=useState('');
  const[username,setUsername]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState(''); 
  const[confirmPassword,setConfirmPassword]=useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');
  const[loggedIn,setLoggedIn]=useState(()=>{
    return localStorage.getItem("loggedIn")==="true";
  });

  const makemelogin=()=>{
    setLoggedIn(true);
    localStorage.setItem("loggedIn","true");
  }  

  const makemelogout=()=>{
    setLoggedIn(false);
    setUsername('');
    localStorage.removeItem("loggedIn");
    clearcart();
  }

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((x) => x.id === item.id);
      if (itemExists) {
        return prevCart.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setMessage(`${item.productName} added to cart!`);
    setOpenPopup(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setMessage(`Item removed from cart.`);
    setOpenPopup(true);
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearcart=()=>{
    setCart([]);
  }

  const closePopup = () => {
    setOpenPopup(false);
    setMessage('');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loggedIn,
        id,
        setId,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        makemelogin,
        makemelogout,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        clearcart,
        openPopup,
        message,
        setMessage,
        setOpenPopup,
        closePopup,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
