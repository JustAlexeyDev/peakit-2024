import React, { useEffect, useState } from 'react';
import ip from "../../config";
import "./Categories.css";

const Categories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/api/categories/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='Categories--Container'>
      <h2>Категории</h2>
      {products.length > 0 ? (
        <div className='Categories--Items'>
          {products.map((product) => (
            <div key={product.id}>
              <img className='Categories--Items__Image' src={product.image} alt={product.name || 'Product Image'} />
            </div>
          ))}          
        </div>

      ) : (
        <p>Нет доступных категорий</p>
      )}
    </div>
  );
}

export default Categories;