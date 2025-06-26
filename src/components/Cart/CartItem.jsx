import React from 'react';
import './styles.css';

function CartItem({ item, index, updateQuantity, removeFromCart, selectedCurrency }) {
  const price = item.product.prices.find(p => p.currency.label === selectedCurrency);

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

        {/* Atributi */}
        {Object.entries(item.selectedAttributes).map(([attrId, itemId], i) => {
          const attribute = item.product.attributes.find(a => a.id === parseInt(attrId));
          const selectedItem = attribute?.items.find(i => i.id === parseInt(itemId));

          if (!attribute || !selectedItem) return null;

          const attrName = attribute.name.toLowerCase().replace(/\s+/g, '-');
          const displayValue = selectedItem.displayValue || selectedItem.value;
          const cleanDisplay = displayValue.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

          return (
            <div key={i}>
              <span data-testid={`product-attribute-${attrName}-${cleanDisplay}-selected`}>
                {displayValue}
              </span>
            </div>
          );
        })}

        {/* Količina */}
        <div className="quantity-controls">
          <button data-testid="cart-item-amount-decrease" onClick={decrease}>-</button>
          <span data-testid="cart-item-amount">{item.quantity}</span>
          <button data-testid="cart-item-amount-increase" onClick={increase}>+</button>
        </div>

        {/* Cena */}
        <div className="price">
          {price && `${price.currency.symbol}${(price.amount * item.quantity).toFixed(2)}`}
        </div>
      </div>
    </div>
  );
}

export default CartItem;