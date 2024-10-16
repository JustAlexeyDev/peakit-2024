import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ip from "../config";

const MenuScreen = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/api/products/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched products:', data);
        const filteredProducts = category 
          ? data.filter(product => {
              console.log('Filtering product:', product.category.name, 'with category:', category);
              return product.category.name === category;
            })
          : data;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h2>Меню</h2>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Цена: {product.price}</p>
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>Нет доступных продуктов в этой категории</p>
      )}
    </div>
  );
}

export default MenuScreen;