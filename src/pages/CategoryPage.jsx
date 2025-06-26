import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProductCard from '../components/Product/ProductCard';
import { GET_PRODUCTS } from '../queries';
import './styles.css';

function CategoryPage({ addToCart, selectedCurrency }) {
  const { categoryName } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: categoryName === 'all' ? null : categoryName }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="category-page">
      <h2 className="category-title">{categoryName || 'All'}</h2>
      <div className="products-grid">
        {data.products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            selectedCurrency={selectedCurrency}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;