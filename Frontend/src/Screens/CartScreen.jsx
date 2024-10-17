import { useNavigate } from 'react-router-dom';
import "./Styles/CartScreen.css";

const CartScreen = ({ cart, products, updateQuantity, removeFromCart, totalPrice }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/payment', { state: { totalPrice } });
  };

  return (
    <div className="menu-screen">
      <h2>Корзина</h2>
      {Object.keys(cart).length > 0 ? (
        <div className="product-list">
          {Object.keys(cart).map((productId) => {
            const product = products.find(p => p.id === parseInt(productId));
            if (!product) return null;
            return (
              <div onClick={() => viewProductDetails(product.id)} key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className='product--description'>
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>                
                  </div> 
                  {cart[product.id] ? (
                    <div className="cart-controls">
                      <div className='product--buy--button'>
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, -1); }}>-</button>
                        <span>{cart[product.id]} шт</span>
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, 1); }}>+</button>
                      </div>
                      <div className='product--buy--button__remove'>
                        <button onClick={(e) => { e.stopPropagation(); removeFromCart(product.id); }}>
                          Удалить
                          <p>({cart[product.id] * product.price} ₽)</p>  
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button className='product--buy--button' onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
                      <b>В Корзину </b>
                      <p>{product.price} ₽</p>
                    </button>
                  )}
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