import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate para react-router-dom v6

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Cambiado a useNavigate para react-router-dom v6
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentError(null);
      alert('Pago realizado exitosamente');
      navigate('/'); // Cambiado a navigate para react-router-dom v6
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tarjeta de Crédito
          <CardElement />
        </label>
        <button type="submit">Pagar</button>
      </form>
      {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
    </div>
  );
};

export default Checkout;