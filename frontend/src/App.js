import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import UserProfile from './components/UserProfile';
import CartPage from './components/CartPage';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
