import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingCartDetails = ({ cart, onRemoveFromCart }) => (
  <div className="shopping-cart-details" id="cart-details">
    <h2>Detalles del Carrito</h2>
    <ul>
      {cart.map(item => (
        <li key={item.id}>
          {item.name} - Cantidad: {item.quantity}{' '}
          <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
    <div className="checkout">
      <Link to="/checkout">
        <button>Pagar</button>
      </Link>
    </div>
  </div>
);

export default ShoppingCartDetails;