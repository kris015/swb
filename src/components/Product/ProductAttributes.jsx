import React from 'react';
import './styles.css';

function ProductAttributes({ attributes, selectedAttributes, onAttributeChange }) {
  return (
    <div className="product-attributes">
      {attributes.map(attribute => (
        <div 
          key={attribute.id}
          data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <h4>{attribute.name}:</h4>
          <div className="attribute-options">
            {attribute.items.map(item => {
              const displayValue = item.displayValue || item.value;
              const isSelected = selectedAttributes[attribute.id] === item.id;

              return attribute.type === 'swatch' ? (
                <div
                  key={item.id}
                  className={`swatch ${isSelected ? 'selected' : ''}`}
                  style={{ backgroundColor: item.value }}
                  onClick={() => onAttributeChange(attribute.id, item.id)}
                  data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}-${displayValue.toLowerCase().replace(/\s+/g, '-')}${isSelected ? '-selected' : ''}`}
                ></div>
              ) : (
                <button
                  key={item.id}
                  className={`text-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => onAttributeChange(attribute.id, item.id)}
                  data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}-${displayValue.toLowerCase().replace(/\s+/g, '-')}${isSelected ? '-selected' : ''}`}
                >
                  {displayValue}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductAttributes;