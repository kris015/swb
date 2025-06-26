// src/components/Header/Header.jsx

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../queries';
import './styles.css';

function Header({ toggleCart, cartItems, selectedCurrency, setSelectedCurrency }) {
  const { loading: categoriesLoading, data: categoriesData } = useQuery(GET_CATEGORIES);
  const { loading: currenciesLoading, data: currenciesData = {} } = useQuery(GET_CURRENCIES);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <nav className="header-nav">
        {!categoriesLoading && categoriesData?.categories?.map(category => (
          <NavLink
            key={category.id}
            to={`/category/${category.name}`} // <-- Promenjeno sa "/" na "/category/all"
            className={({ isActive }) => 
              `header-nav-link ${isActive ? 'active' : ''}`
            }
            data-testid={category.name === 'all' ? 'category-link' : 'active-category-link'}
          >
            {category.name}
          </NavLink>
        ))}
      </nav>
      <div className="header-logo">
        <Link to="/">Scandiweb Store</Link>
      </div>
      <div className="header-actions">
        {!currenciesLoading && currenciesData?.currencies && (
          <select 
            className="currency-selector"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {currenciesData.currencies.map(currency => (
              <option key={currency.id} value={currency.label}>
                {currency.symbol} {currency.label}
              </option>
            ))}
          </select>
        )}
        <button 
          className="cart-button" 
          onClick={toggleCart}
          data-testid="cart-btn"
        >
          🛒
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
