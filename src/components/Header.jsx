import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import './Header.css';

export function Header({ cart }) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();

  let totalQuantity = 0;
  if (Array.isArray(cart)) {
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
  }

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link brand-link">
          <span className="brand-logo-text">TryMe</span>
        </Link>
      </div>

      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="search-button" onClick={handleSearch}>
          <img className="search-icon" src="images/icons/search-icon.png" alt="Search" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}