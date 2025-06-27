// src/components/Product/ProductAttributes.jsx

import React from 'react';
import './styles.css';

function ProductAttributes({ attributes, selectedAttributes, onAttributeChange }) {
  return (
    <div className="product-attributes">
      {attributes.map(attribute => {
        const attributeName = attribute.name.toLowerCase().replace(/\s+/g, '-');
        return (
          <div 
            key={attribute.id}
            data-testid={`product-attribute-${attributeName}`}
          >
            <h4>{attribute.name}:</h4>
            <div className="attribute-options">
              {attribute.items.map(item => {
                // Koristi originalnu vrednost za testId (sa # ako postoji)
                const displayValue = item.displayValue || item.value;
                const isSelected = selectedAttributes[attribute.id] === item.id;

                // Održavamo tačno ono što API šalje, sa svim karakterima
                const testIdBase = `product-attribute-${attributeName}-${displayValue}`;
                const testId = isSelected ? `${testIdBase}-selected` : testIdBase;

                return attribute.type === 'swatch' ? (
                  <div
                    key={item.id}
                    className={`swatch ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: item.value }}
                    onClick={() => onAttributeChange(attribute.id, item.id)}
                    data-testid={testId}
                  ></div>
                ) : (
                  <button
                    key={item.id}
                    className={`text-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => onAttributeChange(attribute.id, item.id)}
                    data-testid={testId}
                  >
                    {displayValue}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductAttributes;