import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";
import MenuScreen from "./Screens/MenuScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import CartScreen from "./Screens/CartScreen";
import ProductDetailScreen from "./Screens/ProductDetailScreen";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ip from "./config";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/api/products/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return <div>Загрузка...</div>;
  }

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
        <Route path="/product/:productId" element={<ProductDetailScreen products={products} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;