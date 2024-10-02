// src/components/OrderForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Using environment variables for Product and Order Service URLs
  const PRODUCT_SERVICE_URL = process.env.REACT_APP_PRODUCT_SERVICE_URL;
  const ORDER_SERVICE_URL = process.env.REACT_APP_ORDER_SERVICE_URL;

  useEffect(() => {
    // Fetch products for the order form
    axios.get(`${PRODUCT_SERVICE_URL}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products!", error);
      });
  }, [PRODUCT_SERVICE_URL]);

  const handleOrderSubmit = () => {
    const order = {
      product_id: selectedProduct,
      quantity: quantity
    };

    // Post order to the Order Service
    axios.post(`${ORDER_SERVICE_URL}/orders`, order)
      .then(response => {
        alert('Order placed successfully!');
      })
      .catch(error => {
        console.error("Error placing order!", error);
      });
  };

  return (
    <div className="container">
      <h1>Place an Order</h1>
      <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="">Select a product</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleOrderSubmit}>Place Order</button>
    </div>
  );
};

export default OrderForm;
