import React, { useState } from 'react';
import './styles.css';

function ProductAttributes({ attributes, selectedAttributes, onAttributeChange }) {
  return (
    <div className="product-attributes">
      {attributes.map(attribute => (
        <div 
          key={attribute.id}
          className="attribute"
          data-testid={`product-attribute-${attribute.name.toLowerCase().replace(' ', '-')}`}
        >
          <h4>{attribute.name}:</h4>
          <div className="attribute-options">
            {attribute.items.map(item => (
              attribute.type === 'swatch' ? (
                <div
                  key={item.id}
                  className={`swatch ${selectedAttributes[attribute.id] === item.id ? 'selected' : ''}`}
                  style={{ backgroundColor: item.value }}
                  onClick={() => onAttributeChange(attribute.id, item.id)}
                  data-testid={`product-attribute-${attribute.name.toLowerCase().replace(' ', '-')}-${item.displayValue.toLowerCase().replace(' ', '-')}${selectedAttributes[attribute.id] === item.id ? '-selected' : ''}`}
                ></div>
              ) : (
                <button
                  key={item.id}
                  className={`text-option ${selectedAttributes[attribute.id] === item.id ? 'selected' : ''}`}
                  onClick={() => onAttributeChange(attribute.id, item.id)}
                  data-testid={`product-attribute-${attribute.name.toLowerCase().replace(' ', '-')}-${item.displayValue.toLowerCase().replace(' ', '-')}${selectedAttributes[attribute.id] === item.id ? '-selected' : ''}`}
                >
                  {item.displayValue}
                </button>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductAttributes;