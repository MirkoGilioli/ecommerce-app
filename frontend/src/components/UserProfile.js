import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user profile from the User Service
    axios.get('https://user-service-10295615397.us-west1.run.app/users/1') // Assuming user ID 1 for demo
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user profile!", error);
      });

    // Fetch orders from the Order Service  axios.get('http://order-service:5002/orders')
    axios.get('https://order-service-10295615397.us-west1.run.app/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching order history!", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}

      <h2>Order History</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            Order {index + 1}: Product ID {order.product_id}, Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
