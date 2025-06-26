import React from 'react';
import './styles.css';

function CartItem({ item, index, updateQuantity, removeFromCart, selectedCurrency }) {
  const { product, selectedAttributes, quantity } = item;
  const price = product.prices.find(p => p.currency.label === selectedCurrency);

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{product.brand}</h4>
        <h3>{product.name}</h3>
        <div className="cart-item-price">
          {price && `${price.currency.symbol}${price.amount.toFixed(2)}`}
        </div>
        <div className="cart-item-attributes">
          {product.attributes.map(attr => (
            <div 
              key={attr.id}
              className="cart-item-attribute"
              data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(' ', '-')}`}
            >
              <h5>{attr.name}:</h5>
              {attr.type === 'swatch' ? (
                <div 
                  className="color-swatch"
                  style={{ backgroundColor: attr.items.find(i => i.id === selectedAttributes[attr.id])?.value }}
                ></div>
              ) : (
                <div className="attribute-value">
                  {attr.items.find(i => i.id === selectedAttributes[attr.id])?.displayValue}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="cart-item-quantity">
        <button 
          onClick={() => updateQuantity(index, quantity + 1)}
          data-testid="cart-item-amount-increase"
        >
          +
        </button>
        <span data-testid="cart-item-amount">{quantity}</span>
        <button 
          onClick={() => updateQuantity(index, quantity - 1)}
          data-testid="cart-item-amount-decrease"
        >
          -
        </button>
      </div>
      <div className="cart-item-image">
        <img src={product.gallery[0]} alt={product.name} />
      </div>
    </div>
  );
}

export default CartItem;