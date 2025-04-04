import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {
  Container,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";
import AuthContext from "./AuthContext";

export default function adminLogin() {
  const { login, isAdminLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateAdmin = () => {
    if (adminId === "admin@123" && adminEmail === "admin@gmail.com" && adminPassword === "Admin(123)." && adminConfirmPassword === "Admin(123).") {
      login();
      navigate("/admin-order-details"); // Replace with your actual admin order details route
    } else {
      setError("Enter valid Admin ID or Email");
    }
  };
      const gotohome=()=>{
        navigate('/');
      };
      const gotoadminOrderdetails=()=>{
        navigate('/admin-order-details');
      }

  return (
    <div>
        <AppBar position="static" sx={{marginBottom:'15px'}}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Typography flexGrow={1} sx={{fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.25rem", lg: "1.50rem" }, color: 'white' }}>Admin Login Page</Typography>
            <AdminPanelSettingsIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: 'white' }} onClick={gotoadminOrderdetails}/>
        <HomeIcon variant="filled" sx={{ fontSize: { xs: "2rem", sm: "2.25rem", md: "2.50rem", lg: "2.75rem" }, color: 'white' }} onClick={gotohome} />
        </Toolbar>
      </AppBar>
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      {isAdminLoggedIn ? (
        <Typography variant="h5" color="black" sx={{ textAlign: "center" }}>
          You are logged in as Admin
        </Typography>
      ) : (
        <form onSubmit={validateAdmin} style={{marginTop:'50px', display: "flex", flexDirection: "column", gap: "1.5em", bgcolor: "white", width: "25%" ,alignItems:'center',justifyContent:'center'}}>
          <Typography variant="h5" color="black" sx={{ textAlign: "center" }}>
            Admin Login
          </Typography>
          <TextField
          fullWidth={true}
          sx={{width:'350px'}}
            type="text"
            label="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField
          fullWidth={true}
          sx={{width:'350px'}}
            type="email"
            label="Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            error={!!error}
          />
          <TextField
          fullWidth={true}
          sx={{width:'350px'}}
            type="password"
            label="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            error={!!error}
          />
          <TextField
          fullWidth={true}
          sx={{width:'350px'}}
            type="password"
            label="Confirm Password"
            value={adminConfirmPassword}
            onChange={(e) => setAdminConfirmPassword(e.target.value)}
            error={!!error}
          />
          <Button type="submit" sx={{ bgcolor: "primary.main", color: "black" }} variant="contained">
            Login
          </Button>
        </form>
      )}
    </Container>
    </div>
  );
}