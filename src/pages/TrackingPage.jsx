import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../components/Header';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/orders/${orderId}?expand=products`);
        setOrderData(response.data);
      } catch (err) {
        console.error('Failed to load tracking details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackingData();
  }, [orderId]);

  const targetProduct = orderData?.products?.find(
    p => p.productId === productId || p.product?.id === productId
  ) || orderData?.products?.[0];

  const productInfo = targetProduct?.product;

  let percentProgress = 50;
  let isPreparing = false;
  let isShipped = true;
  let isDelivered = false;

  if (orderData && targetProduct) {
    const orderTime = orderData.orderTimeMs;
    const deliveryTime = targetProduct.estimatedDeliveryTimeMs;
    const currentTime = Date.now();

    if (currentTime >= deliveryTime) {
      percentProgress = 100;
      isDelivered = true;
      isShipped = false;
    } else if (orderTime && deliveryTime && deliveryTime > orderTime) {
      const totalTime = deliveryTime - orderTime;
      const elapsedTime = currentTime - orderTime;
      percentProgress = Math.max(10, Math.min(95, Math.round((elapsedTime / totalTime) * 100)));
      if (percentProgress < 33) {
        isPreparing = true;
        isShipped = false;
      }
    }
  }

  return (
    <>
      <Header cart={cart || []} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          {loading ? (
            <div style={{ marginTop: '20px', fontSize: '16px' }}>Loading tracking details...</div>
          ) : targetProduct && productInfo ? (
            <>
              <div className="delivery-date">
                Arriving on {dayjs(targetProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>

              <div className="product-info">
                {productInfo.name}
              </div>

              <div className="product-info">
                Quantity: {targetProduct.quantity}
              </div>

              <img className="product-image" src={productInfo.image} alt={productInfo.name} />

              <div className="progress-labels-container">
                <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
                  Preparing
                </div>
                <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
                  Shipped
                </div>
                <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
                  Delivered
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentProgress}%` }}></div>
              </div>
            </>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <h3>No tracking information found.</h3>
              <p>Please select an item from your <Link to="/orders" className="link-primary">Orders</Link> to view tracking status.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}