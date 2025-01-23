import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import product1Image from './iphone.jpg';
import product2Image from './samsung.jpg';
import product3Image from './nothing.jpg';
import product4Image from './huawei.jpg';
import product5Image from './vivo.png';
import product6Image from './rog.png';

const ProductList = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'iPhone 16 Pro Max', price: 999.99, image: product1Image, description: 'Get ₹5000.00–₹67500.00 off iPhone 16 Pro or iPhone 16 Pro Max when you trade in an iPhone 7 or newer.' },
    { id: 2, name: 'Samsung S24 Ultra', price: 1099.99, image: product2Image, description: 'Buy the new Samsung Galaxy S24 Ultra with new AI features. Get Instant Bank Cashback, Exchange bonus, Referral Advantage, No Cost EMI and more benefits2' },
    { id: 3, name: 'Nothing Phone 2', price: 399.99, image: product3Image, description: 'Nothing Phone (2) Android smartphone. Announced Jul 2023. Features 6.7″ display, Snapdragon 8+ Gen 1 chipset, 4700 mAh battery, 512 GB storage, 12 GB RAM' },
    { id: 4, name: 'Huawei Mate 50', price: 699.99, image: product4Image, description: 'A powerful phone with a 50MP camera and a robust chipset.' },
    { id: 5, name: 'Vivo V40', price: 799.99, image: product5Image, description: 'Vivo’s latest smartphone with cutting-edge camera features and powerful processing.' },
    { id: 6, name: 'ROG Phone 8', price: 999.99, image: product6Image, description: 'A gaming beast with Snapdragon 8+ Gen 1 and a 6000mAh battery.' }
  ];

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} addToCart={addToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
