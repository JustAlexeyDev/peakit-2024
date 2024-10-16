import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Если вы используете React Router
import ip from "../../config";
import "./Categories.css";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Инициализация useNavigate

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

  const handleCategoryClick = (category) => {
    navigate(`/MenuScreen?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className='Categories--Container'>
      <h2>Категории</h2>
      {products.length > 0 ? (
        <div className='Categories--Items'>
          {products.map((product) => (
            <button 
              key={product.id} 
              className='Categories--Items__Button' 
              onClick={() => handleCategoryClick(product.name)}
            >
              <img 
                className='Categories--Items__Image' 
                src={product.image} 
                alt={product.name || 'Product Image'} 
              />
            </button>
          ))}          
        </div>
      ) : (
        <p>Нет доступных категорий</p>
      )}
    </div>
  );
}

export default Categories;