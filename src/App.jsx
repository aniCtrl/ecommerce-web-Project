
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { Homepage } from './pages/home/Homepage'
import { CheckoutPage } from './checkout/CheckoutPage';
import { OrdersPage } from './orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { OrderSummary } from './checkout/OrderSummary';
import { CheckoutHeader } from './checkout/CheckoutHeader';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppData = async() => {
       const response = await axios.get('/api/cart-items?expand=product');
        setCart(response.data)
    };
    fetchAppData();
  }, []);

  return (
    <Routes>
      <Route index element={<Homepage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={< TrackingPage />} />
    </Routes>

  )
}

export default App
