// Product.js
import React from 'react';
import './Product.css';

const Product = ({ product, onAddToCart }) => {
  const { id, name, price, image, description } = product;

  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Precio: ${price}</p>
      <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
    </div>
  );
};

export default Product;
