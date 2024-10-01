import React from 'react';
import axios from 'axios';
import '../App.css';

const ProductList = ({ products }) => {
  const userId = "1";  // Mocked user ID, replace with real ID

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(`https://cart-service-10295615397.us-west1.run.app/cart/${userId}`, {
        id: product.id,
        name: product.name,
        price: product.price
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
