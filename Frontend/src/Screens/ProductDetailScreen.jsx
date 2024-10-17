// ProductDetailScreen.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailScreen = ({ products }) => {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <p>Цена: {product.price} ₽</p>
      {/* Дополнительные детали о продукте */}
    </div>
  );
};

export default ProductDetailScreen;