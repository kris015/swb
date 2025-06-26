import React from 'react';
import './styles.css';

function CartItem({ item, index, updateQuantity, removeFromCart, selectedCurrency }) {
  const { product, selectedAttributes, quantity } = item;
  const price = product.prices.find(p => p.currency.label === selectedCurrency);

  const decrease = () => {
    if (quantity > 1) {
      updateQuantity(index, quantity - 1);
    } else {
      removeFromCart(index);
    }
  };

  const increase = () => {
    updateQuantity(index, quantity + 1);
  };

  return (
    <div className="cart-item" data-testid={`cart-item-attribute-${product.id}`}>
      <img src={product.gallery[0]} alt={product.name} />
      <div className="cart-item-details">
        <h4>{product.brand}</h4>
        <h3>{product.name}</h3>

        {/* Prikaz svih selektovanih atributa sa tačnim data-testid */}
        {Object.entries(selectedAttributes).map(([attrId, itemId], i) => {
          const attribute = product.attributes.find(attr => attr.id === parseInt(attrId));
          const selectedItem = attribute?.items.find(item => item.id === parseInt(itemId));

          if (!attribute || !selectedItem) return null;

          const attributeName = attribute.name.toLowerCase().replace(/\s+/g, '-');
          const displayValue = selectedItem.displayValue.toLowerCase().replace(/\s+/g, '-');

          return (
            <div 
              key={i}
              data-testid={`cart-item-attribute-${attributeName}-${displayValue}-selected`}
            >
              {attribute.type === 'swatch' ? (
                <div 
                  className="color-swatch"
                  style={{ backgroundColor: selectedItem.value }}
                ></div>
              ) : (
                <span>{selectedItem.displayValue}</span>
              )}
            </div>
          );
        })}

        <div className="price">
          {price && `${price.currency.symbol}${(price.amount * quantity).toFixed(2)}`}
        </div>

        <div className="quantity-controls">
          <button 
            data-testid="cart-item-amount-decrease" 
            onClick={decrease}
          >
            -
          </button>
          <span data-testid="cart-item-amount">{quantity}</span>
          <button 
            data-testid="cart-item-amount-increase" 
            onClick={increase}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;