import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Support from './pages/Support';
import Terms from './pages/Terms';
import AuthSuccess from './pages/AuthSuccess';
import ServicesPage from './pages/ServicesPage';  // ✅ JÁ ADICIONADO
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationProvider';

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="/services" element={<ServicesPage />} />  {/* ✅ JÁ ADICIONADO */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;