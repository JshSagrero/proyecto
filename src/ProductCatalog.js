// ProductCatalog.js
import React from 'react';
import Product from './Product';

const ProductCatalog = ({ products, onAddToCart }) => {
  return (
    <div className="product-catalog">
      <h2>Catálogo de Productos</h2>
      <div className="products">
        {products.map(product => (
          <Product key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
