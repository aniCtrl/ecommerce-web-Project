import { Link } from 'react-router';
import './CheckoutHeader.css';

export function CheckoutHeader({cart}) {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/" className="brand-link">
              <span className="brand-logo-text">Try<span className="brand-logo-accent">Me</span></span>
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">{totalQuantity} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
  );
}