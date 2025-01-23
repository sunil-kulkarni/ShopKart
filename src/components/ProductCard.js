import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ product }),
      });
  
      const data = await response.json();
      if (data.success) {
        alert('Product added to cart');
      } else {
        console.error('Error adding to cart:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="450" image={product.image} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6">
          ${product.price}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddToCart} style={{ marginTop: '10px' }}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
