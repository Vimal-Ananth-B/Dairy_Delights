import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    AppBar,
    Toolbar,
    Button,
    IconButton,
} from '@mui/material';
import AuthContext from './AuthContext';

async function fetchOrderDetails(id) {
  // const response = await fetch(`http://localhost:3001/users/`);
  const response = await fetch(`https://67e2805297fc65f53536634d.mockapi.io/mockapi/users/usersData`);
  if (!response.ok) {
    throw new Error('Failed to fetch order details');
  }
  return await response.json();
}

async function deleteOrder(id) {
  const response = await fetch(`https://67e2805297fc65f53536634d.mockapi.io/mockapi/users/usersData/${id}`, {
    method: 'DELETE',
  });
  // const response = await fetch(`http://localhost:3001/users/${id}`, {
  //   method: 'DELETE',
  // });
  if (!response.ok) {
    throw new Error('Failed to delete the order');
  }
}

function adminOrderDetails({ userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { isAdminLoggedIn,logout } = useContext(AuthContext);
  const navigate=useNavigate();
    const gotohome=()=>{
      navigate('/');
      logout();
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderDetails(userId);
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (isAdminLoggedIn) {
      fetchData();
    }
  }, [isAdminLoggedIn, userId]);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setUserDetails((prevDetails) =>
        prevDetails.filter((user) => user.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <Box sx={{ width: "100%", marginTop: 4, textAlign: 'center' }}>
        <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography flexGrow={1} sx={{fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.25rem", lg: "1.50rem" }, color: 'white' }}>Admin Order Page</Typography>
            <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: 'white' }} onClick={gotohome} />
            </Toolbar>
            </AppBar>
        <Typography variant="h4" color="error">
          You must be logged in as an administrator to view order details.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!userDetails) {
    return (
      <Box sx={{ width: "100%", marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h4">Loading order details...</Typography>
      </Box>
    );
  }

  return (
    <div> 
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography flexGrow={1} sx={{fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.25rem", lg: "1.50rem" }, color: 'white' }}>Admin Order Page</Typography>
            <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: 'white' }} onClick={gotohome} />
          {isAdminLoggedIn && (
            <IconButton onClick={logout} color="inherit" aria-label="Logout">
              <i className="material-icons">logout</i> 
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    <Box sx={{ width: "100%", marginTop: 4, overflowX: "auto", minHeight: "60vh" }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
        Order Details
      </Typography>
      <TableContainer component="div">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Items</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Delivery Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetails.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.UserName}</TableCell>
                <TableCell>
                  {user.cart.map((item) => (
                    <div key={item.id}>
                      {item.productName} - {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{user.total}</TableCell>
                <TableCell>
                  {user.Address}, {user.City}, {user.State} - {user.ZipCode}
                </TableCell>
                <TableCell>{user.PhoneNumber}</TableCell>
                <TableCell>{user.DeliveryDate}</TableCell>
                <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
}

export default adminOrderDetails;