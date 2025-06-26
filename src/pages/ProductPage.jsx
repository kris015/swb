import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProductGallery from '../components/Product/ProductGallery';
import ProductAttributes from '../components/Product/ProductAttributes';
import { GET_PRODUCT } from '../queries';
import './styles.css';

function ProductPage({ addToCart, selectedCurrency }) {
  const { productId } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId }
  });

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.product || {};
  
  // Provere za svaki potencijalno opasan podatak
  const safeAttributes = Array.isArray(product.attributes) ? product.attributes : [];
  const safeGallery = Array.isArray(product.gallery) ? product.gallery : [];

  const price = safeAttributes.length > 0 
    ? product.prices.find(p => p.currency.label === selectedCurrency) 
    : null;

  const handleAttributeChange = (attributeId, itemId) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: itemId
    }));
  };

  const handleAddToCart = () => {
    const allSelected = safeAttributes.every(attr => selectedAttributes[attr.id]);

    if (!allSelected && safeAttributes.length > 0) {
      alert('Please select all attributes before adding to cart');
      return;
    }

    addToCart(product, selectedAttributes);
  };

  return (
    <div className="product-page">
      <div 
        className="product-gallery-container" 
        data-testid="product-gallery"
      >
        <ProductGallery images={safeGallery} />
      </div>

      <div className="product-info">
        <h2>{product.brand}</h2>
        <h1>{product.name}</h1>

        {safeAttributes.length > 0 ? (
          safeAttributes.map(attr => (
            <div 
              key={attr.id} 
              data-testid={`product-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <h4>{attr.name}</h4>
              <ProductAttributes
                attribute={attr}
                selectedAttributes={selectedAttributes}
                onAttributeChange={handleAttributeChange}
              />
            </div>
          ))
        ) : null}

        <div className="price-section">
          <h3>Price:</h3>
          <div className="price">
            {price ? `${price.currency.symbol}${price.amount.toFixed(2)}` : 'N/A'}
          </div>
        </div>

        <button
          className={`add-to-cart ${!product.inStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          data-testid="add-to-cart"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        <div 
          className="product-description" 
          dangerouslySetInnerHTML={{ __html: product.description || '<p>No description available</p>' }}
          data-testid="product-description"
        ></div>
      </div>
    </div>
  );
}

export default ProductPage;