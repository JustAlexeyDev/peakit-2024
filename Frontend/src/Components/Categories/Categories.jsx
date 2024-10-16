import React, { useEffect, useState } from 'react';
import ip from "../../config";

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
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Категории</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name || 'Product Image'} />
          </div>
        ))
      ) : (
        <p>Нет доступных категорий</p>
      )}
    </div>
  );
}

export default Categories;