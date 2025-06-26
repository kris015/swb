import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function ProductCard({ product, addToCart, selectedCurrency }) {
  const [isHovered, setIsHovered] = useState(false);
  const price = product.prices.find(p => p.currency.label === selectedCurrency);

  const handleQuickAdd = () => {
    // Add with default attributes (first item in each attribute)
    const defaultAttributes = {};
    product.attributes.forEach(attr => {
      defaultAttributes[attr.id] = attr.items[0].id;
    });
    addToCart(product, defaultAttributes);
  };

  return (
    <div 
      className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`product-${product.name.toLowerCase().replace(/ /g, '-')}`}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.gallery[0]} alt={product.name} />
          {!product.inStock && <div className="out-of-stock-label">OUT OF STOCK</div>}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <h4>{product.brand}</h4>
          <div className="product-price">
            {price && `${price.currency.symbol}${price.amount.toFixed(2)}`}
          </div>
        </div>
      </Link>
      {product.inStock && isHovered && (
        <button 
          className="quick-add"
          onClick={handleQuickAdd}
        >
          🛒
        </button>
      )}
    </div>
  );
}

export default ProductCard;