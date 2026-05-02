import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './Homepage.css';
import { ProductsGrid } from './ProductsGrid';

export function Homepage({cart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
   .then((response) => {
    setProducts(response.data);
   });
  },[])

  return (
    <>
      <Header cart = {cart} />

      <title>Ecommerce Project</title>


      <div className="home-page">
        <ProductsGrid products={products}/>
      </div>
    </>
  );
}