import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ip from "../config";
import './Styles/MenuScreen.css'; // Подключаем CSS

const MenuScreen = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${ip}/api/users/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length > 0) {
          setIsLoggedIn(true);
        } else {
          navigate('/register');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/register');
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/api/products/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredProducts = category 
          ? data.filter(product => product.category.name === category)
          : data;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const saveCartToServer = async (cartData) => {
    try {
      const response = await fetch(`${ip}/api/carts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Cart saved successfully:', data);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      saveCartToServer(cart);
    }
  }, [cart, isLoggedIn]);

  const addToCart = useCallback((productId) => {
    if (!isLoggedIn) {
      navigate('/RegisterScreen');
      return;
    }
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }));
  }, [isLoggedIn, navigate]);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: Math.max(0, (prevCart[productId] || 0) + quantity)
    }));
  }, []);

  const totalPrice = useMemo(() => {
    return Object.keys(cart).reduce((total, productId) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * cart[productId] : 0);
    }, 0);
  }, [cart, products]);

  return (
    <div className="menu-screen">
      <h2>Меню</h2>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className='product--description'>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>                
                </div> 
                {cart[product.id] ? (
                  <div className="cart-controls">
                    <div className='product--buy--button'>
                      <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                      <span>{cart[product.id]} шт</span>
                      <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                    </div>
                    <div className='product--buy--button__remove'>
                      <button onClick={() => removeFromCart(product.id)}>
                        Удалить
                        <p>({cart[product.id] * product.price} ₽)</p>  
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className='product--buy--button' onClick={() => addToCart(product.id)}>
                    <b>В Корзину </b>
                    <p>{product.price} ₽</p>
                  </button>
                )}               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет доступных продуктов в этой категории</p>
      )}
      <div className="total-price">
        <p>Итого: {totalPrice} ₽</p>
      </div>
    </div>
  );
}

export default MenuScreen;