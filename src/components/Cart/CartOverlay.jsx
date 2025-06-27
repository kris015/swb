import React from 'react';
import CartItem from './CartItem';
import './styles.css';

function CartOverlay({ cartItems, updateQuantity, removeFromCart, placeOrder, selectedCurrency, toggleCart }) {
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product.prices.find(p => p.currency.label === selectedCurrency);
    return total + (price ? price.amount * item.quantity : 0);
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // U CartOverlay.jsx, osigurajte da imate sve potrebne data-testid atribute:
return (
  <div className="cart-overlay" data-testid="cart-overlay">
    <div className="cart-header" data-testid="cart-header">
      <h3>My Bag</h3>
      <span data-testid="cart-item-count">
        {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
      </span>
    </div>
    <div className="cart-items" data-testid="cart-items-list">
      {cartItems.map((item, index) => (
        <CartItem
          key={`${item.product.id}-${JSON.stringify(item.selectedAttributes)}`}
          item={item}
          index={index}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          selectedCurrency={selectedCurrency}
        />
      ))}
    </div>
    <div className="cart-total" data-testid="cart-total-section">
      <span>Total</span>
      <span data-testid="cart-total">
        {price && `${price.currency.symbol}${totalPrice.toFixed(2)}`}
      </span>
    </div>
    <div className="cart-actions" data-testid="cart-actions">
      <button 
        className="view-bag" 
        onClick={toggleCart}
        data-testid="view-bag-btn"
      >
        View Bag
      </button>
      <button 
        className="checkout" 
        onClick={placeOrder}
        disabled={cartItems.length === 0}
        data-testid="checkout-btn"
      >
        Check Out
      </button>
    </div>
  </div>
);
}

export default CartOverlay;