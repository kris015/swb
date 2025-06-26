import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import './styles/main.css';
import CartOverlay from './components/Cart/CartOverlay';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product, selectedAttributes) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item =>
        item.product.id === product.id &&
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { product, selectedAttributes, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(index);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      return updatedItems;
    });
  };

  const placeOrder = async () => {
    try {
      const orderProducts = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        attributes: Object.entries(item.selectedAttributes).map(([attrId, itemId]) => ({
          attributeId: parseInt(attrId),
          attributeItemId: parseInt(itemId)
        }))
      }));

      console.log('Order placed:', orderProducts);
      setCartItems([]);
      setIsCartOpen(false);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="app">
      <Header 
        toggleCart={toggleCart} 
        cartItems={cartItems} 
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
      <div className={`page-overlay ${isCartOpen ? 'active' : ''}`} onClick={toggleCart}></div>
      <Routes>
        <Route path="/" element={<CategoryPage addToCart={addToCart} selectedCurrency={selectedCurrency} />} />
        <Route path="/:categoryName" element={<CategoryPage addToCart={addToCart} selectedCurrency={selectedCurrency} />} />
        <Route path="/product/:productId" element={<ProductPage addToCart={addToCart} selectedCurrency={selectedCurrency} />} />
        <Route 
  path="/all" 
  element={<CategoryPage addToCart={addToCart} selectedCurrency={selectedCurrency} />} 
/>
      </Routes>
      {isCartOpen && (
        <CartOverlay 
          cartItems={cartItems} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart}
          placeOrder={placeOrder} 
          selectedCurrency={selectedCurrency}
          toggleCart={toggleCart}
        />
      )}
    </div>
  );
}

export default App;