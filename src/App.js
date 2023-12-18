// Importaciones necesarias para el código
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProductCatalog from './ProductCatalog';
import ShoppingCart from './ShoppingCart';
import Checkout from './checkout'; // Asegúrate de importar el componente Checkout desde la ubicación correcta
import './Product.css';
import anillo from './imag/anillo.jpg';
import collar from './imag/collar.jpg';
import pulsera from './imag/pulsera.jpg';
import './App.css';

// Define tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51OOarpFCoLT3UuF5NcFXiO27fpRlK4LdwxQyyFK2JtrS8GOqkMjJSzVJDv7UDYlxPFGPjEZzvkuToGmFpmfhVAzc00Od6NRDmj');

const Header = ({ onToggleCart }) => (
  <header>
    <h1>Tienda de Joyería Artesanal</h1>
    <p>Descubre piezas únicas y hechas a mano</p>
    <Navigation onToggleCart={onToggleCart} />
  </header>
);

const Navigation = ({ onToggleCart }) => (
  <nav>
    <ul>
      <li><NavLink exact to="/">Inicio</NavLink></li>
      <li><NavLink to="/catalog">Catálogo</NavLink></li>
      <li onClick={onToggleCart}><button>Carrito</button></li>
      <li><NavLink to="/login">Iniciar Sesión</NavLink></li>
      <li><NavLink to="/register">Registro</NavLink></li>
    </ul>
  </nav>
);

const FeaturedProducts = () => (
  <section className="featured-products">
    <h2>Productos Destacados</h2>
    <Product image={anillo} name="Anillo de Plata" description="Descubre nuestra colección de anillos de plata hechos a mano." />
    <Product image={collar} name="Collar de Perlas" description="Explora nuestra elegante selección de collares de perlas artesanales." />
    <Product image={pulsera} name="Pulsera de Cuero" description="Luce a la moda con nuestras pulseras de cuero hechas con atención al detalle." />
  </section>
);

const Product = ({ image, name, description }) => (
  <div className="product">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

const Footer = () => (
  <footer>
    <p>&copy; 2023 Tienda de Joyería Artesanal. Todos los derechos reservados.</p>
  </footer>
);

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisibility] = useState(false);

  const handleToggleCart = () => {
    setCartVisibility(!isCartVisible);
  };

  const handleAddToCart = (product) => {
    const newCart = [...cart];
    const existingProduct = newCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }

    setCart(newCart);
  };

  const handleCheckout = async () => {
    // Simulamos una solicitud al backend para procesar el pago
    try {
      const response = await fetch('http://localhost:8081/127.0.0.1/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
        }),
      });

      if (response.ok) {
        alert('¡Pago exitoso! Gracias por tu compra.');
        setCart([]);
      } else {
        alert('Hubo un problema al procesar el pago. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago. Inténtalo de nuevo más tarde.');
    }
  };

  const handleRemoveFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
  };

  const productsData = [
    { id: 1, name: 'Anillo de Plata', price: 19.99, image: anillo, description: 'Descubre nuestra colección de anillos de plata hechos a mano.' },
    { id: 2, name: 'Collar de Perlas', price: 29.99, image: collar, description: 'Explora nuestra elegante selección de collares de perlas artesanales.' },
    { id: 3, name: 'Pulsera de Cuero', price: 14.99, image: pulsera, description: 'Luce a la moda con nuestras pulseras de cuero hechas con atención al detalle.' },
  ];

  return (
    <Router>
      <div className="landing-page">
        <Header onToggleCart={handleToggleCart} />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/catalog" element={<ProductCatalog products={productsData} onAddToCart={handleAddToCart} />} />
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            }
          />
          <Route path="/" element={<FeaturedProducts />} />
        </Routes>
        {isCartVisible && <ShoppingCart cart={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} />}
        <Footer />
      </div>
    </Router>
  );
};

export default App;