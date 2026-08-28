import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router';
import { formatMoney } from '../utils/money';

import { Header } from '../components/Header';
import './OrdersPage.css'

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersPageData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };
    fetchOrdersPageData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    const product = orderProduct.product;
                    const buyAgain = async () => {
                      await axios.post('/api/cart-items', {
                        productId: product.id,
                        quantity: 1
                      });
                      if (loadCart) await loadCart();
                    };

                    return (
                      <Fragment key={product.id}>
                        <div className="product-image-container">
                          <img src={product.image} alt={product.name} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button 
                            className="buy-again-button button-primary"
                            onClick={buyAgain}
                          >
                            <img className="buy-again-icon" src="images/icons/buy-again.png" alt="" />
                            <span className="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to={`/tracking?orderId=${order.id}&productId=${product.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}