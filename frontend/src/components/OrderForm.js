import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch products for the order form  axios.get('http://product-service:5001/products')
    axios.get('https://product-service-10295615397.us-west1.run.app/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products!", error);
      });
  }, []);

  const handleOrderSubmit = () => {
    const order = {
      product_id: selectedProduct,
      quantity: quantity
    };

    // Post order to the Order Service     axios.post('http://order-service:5002/orders', order)
    axios.post('https://order-service-10295615397.us-west1.run.app/orders', order)
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
