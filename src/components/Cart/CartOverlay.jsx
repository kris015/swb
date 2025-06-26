import React from 'react';
import CartItem from './CartItem';
import './styles.css';

function CartOverlay({ cartItems, updateQuantity, removeFromCart, placeOrder, selectedCurrency, toggleCart }) {
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product.prices.find(p => p.currency.label === selectedCurrency);
    return total + (price ? price.amount * item.quantity : 0);
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-overlay" data-testid="cart-overlay"> {/* Dodato data-testid */}
      <div className="cart-header">
        <h3>My Bag</h3>
        <span>{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
      </div>
      <div className="cart-items">
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
      <div className="cart-total">
        <span>Total</span>
        <span data-testid="cart-total">
          {selectedCurrency} {totalPrice.toFixed(2)}
        </span>
      </div>
      <div className="cart-actions">
        <button 
          className="view-bag" 
          onClick={toggleCart}
        >
          View Bag
        </button>
        <button 
          className="checkout" 
          onClick={placeOrder}
          disabled={cartItems.length === 0}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}

export default CartOverlay;