import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartScreen = ({ cart, products, updateQuantity, removeFromCart, totalPrice }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    // Логика оформления заказа
    console.log('Order placed:', cart);
    // После оформления заказа можно очистить корзину
    // setCart({});
    navigate('/order-confirmation');
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
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                    <span>{cart[product.id]} шт</span>
                    <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)}>Удалить</button>
                  <p>Сумма: {cart[product.id] * product.price} ₽</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Корзина пуста</p>
      )}
      <div className="total-price">
        <p>Итого: {totalPrice} ₽</p>
      </div>
      <button onClick={handleOrder}>Заказать</button>
    </div>
  );
};

export default CartScreen;