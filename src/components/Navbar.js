import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ token, setToken }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Create Account</Button>
            </>
          ) : (
            <Box display="flex" alignItems="center" gap="10px">
              <Avatar alt={user.name} src={user.avatar || '/default-avatar.png'} />
              <Typography variant="body1" style={{ color: 'white' }}>{user.name}</Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Box>
          )}
        </Box>

        <Typography variant="h6" style={{ textAlign: 'center', marginRight: '500px'}}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>ShopKart</Link>
        </Typography>

        <Box display="flex" alignItems="center" gap="10px">
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cart">Cart</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
