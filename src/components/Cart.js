import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCart(data.cart);
            calculateTotal(data.cart);
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
  
    fetchCart();
  }, [cart]); // Add cart as dependency to re-fetch when it changes
  

  // Function to calculate total price
  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalAmount);
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        calculateTotal(updatedCart);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <List>
          {cart.map((product) => (
            <ListItem key={product.id} divider>
              <ListItemText
                primary={product.name}
                secondary={`Price: $${product.price}`}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      {cart.length > 0 && (
        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Total: ${total.toFixed(2)}
        </Typography>
      )}
    </div>
  );
};

export default Cart;
