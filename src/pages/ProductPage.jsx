import React, { useState } from 'react';
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = data.product;
  const price = product.prices.find(p => p.currency.label === selectedCurrency);

  const handleAttributeChange = (attributeId, itemId) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: itemId
    }));
  };

  const handleAddToCart = () => {
    // Check if all attributes are selected
    const allAttributesSelected = product.attributes.every(
      attr => selectedAttributes[attr.id] !== undefined
    );

    if (!allAttributesSelected && product.attributes.length > 0) {
      alert('Please select all attributes before adding to cart');
      return;
    }

    addToCart(product, selectedAttributes);
  };

  // Proveravamo da li su svi atributi izabrani
  const allAttributesSelected = product.attributes.length === 0 || 
    product.attributes.every(attr => selectedAttributes[attr.id] !== undefined);

  return (
    <div className="product-page">
      <div className="product-gallery-container">
        <ProductGallery images={product.gallery} />
      </div>
      <div className="product-info">
        <h2>{product.brand}</h2>
        <h1>{product.name}</h1>
        {product.attributes.length > 0 && (
          <ProductAttributes
            attributes={product.attributes}
            selectedAttributes={selectedAttributes}
            onAttributeChange={handleAttributeChange}
          />
        )}
        <div className="price-section">
          <h3>Price:</h3>
          <div className="price">
            {price && `${price.currency.symbol}${price.amount.toFixed(2)}`}
          </div>
        </div>
        <button
          className={`add-to-cart ${!product.inStock || !allAttributesSelected ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock || !allAttributesSelected}
          data-testid="add-to-cart"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <div 
          className="product-description" 
          dangerouslySetInnerHTML={{ __html: product.description }}
          data-testid="product-description"
        ></div>
      </div>
    </div>
  );
}

export default ProductPage;