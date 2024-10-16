import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";
import MenuScreen from "./Screens/MenuScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import CartScreen from "./Screens/CartScreen";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: Math.max(0, (prevCart[productId] || 0) + quantity)
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const totalPrice = Object.keys(cart).reduce((total, productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    return total + (product ? product.price * cart[productId] : 0);
  }, 0);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/*" element={<NotFoundScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="/MenuScreen" element={<MenuScreen searchTerm={searchTerm} cart={cart} setCart={setCart} products={products} setProducts={setProducts} />} />
        <Route path="/RegisterScreen" element={<RegisterScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/CartScreen" element={<CartScreen cart={cart} products={products} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalPrice={totalPrice} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;