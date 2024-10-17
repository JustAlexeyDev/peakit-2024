// ProductDetailScreen.js
import React from 'react';
import { useParams } from 'react-router-dom';
import "./Styles/ProductDetailScreen.css";

const ProductDetailScreen = ({ products }) => {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="Product--Detail">
      <img src={product.image} alt={product.name} className="product-image" />
      
      <div className='Product--InfoContainer'>
        <div className='Product--InfoContainer__Header'>
          <div>
            <h2>{product.name}</h2>
            <p>{product.category.name}</p>          
          </div>
          <span>
            <p>{product.price} ₽</p>
          </span>
        </div>

        <div className='Product--InfoContainer__OtherInfo'>
          <div>{product.description}</div>  
          <h3>Ингридиенты</h3>
          <div>
            <p>{product.ingredients}</p>
          </div>      
        </div>

      </div>
    </div>
  );
};

export default ProductDetailScreen;