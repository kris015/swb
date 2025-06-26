import React from 'react';
import './styles.css';

function CartItem({ item, index, updateQuantity, removeFromCart, selectedCurrency }) {
  const price = item.product.prices.find(p => p.currency.label === selectedCurrency);
  const amount = price ? price.amount : 0;

  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(index, item.quantity - 1);
    } else {
      removeFromCart(index);
    }
  };

  const increase = () => {
    updateQuantity(index, item.quantity + 1);
  };

  return (
    <div className="cart-item" data-testid={`cart-item-attribute-${item.product.id}`}>
      <img src={item.product.gallery[0]} alt={item.product.name} />
      <div className="cart-item-details">
        <h4>{item.product.brand}</h4>
        <h3>{item.product.name}</h3>
        <div className="cart-item-price">
          {price && `${price.currency.symbol}${price.amount.toFixed(2)}`}
        </div>
        {Object.entries(item.selectedAttributes).map(([attrId, itemId], i) => {
          const attributeName = item.product.attributes.find(a => a.id === parseInt(attrId))?.name || '';
          const displayValue = item.product.attributes
            .find(a => a.id === parseInt(attrId))
            ?.items.find(i => i.id === parseInt(itemId))?.displayValue || '';

          return (
            <div key={i} data-testid={`cart-item-attribute-${attributeName.toLowerCase().replace(/\s+/g, '-')}`}>
              <span data-testid={`cart-item-attribute-${attributeName.toLowerCase().replace(/\s+/g, '-')}-${displayValue.toLowerCase().replace(/\s+/g, '-')}-selected`}>
                {displayValue}
              </span>
            </div>
          );
        })}
        <div className="quantity-controls">
          <button data-testid="cart-item-amount-decrease" onClick={decrease}>-</button>
          <span data-testid="cart-item-amount">{item.quantity}</span>
          <button data-testid="cart-item-amount-increase" onClick={increase}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;