import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/CartScreen.css";

const CartScreen = ({ cart, products, updateQuantity, removeFromCart, totalPrice }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/payment', { state: { totalPrice } });
  };

  return (
    <div className="cart-screen">
      <h2>Корзина</h2>
      {Object.keys(cart).length > 0 ? (
        <div className="cart-items">
          {Object.keys(cart).map((productId) => {
            const product = products.find(p => p.id === parseInt(productId));
            if (!product) return null;
            return (
              <div key={product.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <div className='cart-item-buttons'>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                      <span>{cart[product.id]} шт</span>
                      <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                    </div>
                    <button className='cart-remove' onClick={() => removeFromCart(product.id)}>Удалить
                      <p>Сумма: {cart[product.id] * product.price} ₽</p>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Корзина пуста</p>
      )}
      <div className='Total--Order'>
        <div className="total-price">
          <p>Итого: {totalPrice} ₽</p>
        </div>
        <button onClick={handleOrder}>Перейти к оплате</button>
      </div>
    </div>
  );
};

export default CartScreen;