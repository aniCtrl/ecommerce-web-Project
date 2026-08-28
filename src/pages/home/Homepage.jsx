import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import './Homepage.css';
import { ProductsGrid } from './ProductsGrid';

export function Homepage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const url = search ? `/api/products?search=${encodeURIComponent(search)}` : '/api/products';
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    getHomeData();
  }, [search]);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}