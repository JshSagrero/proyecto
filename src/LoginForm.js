import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes realizar la lógica de autenticación
    console.log('Login:', { username, password });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form>
        <label className="form-label" htmlFor="username">Usuario:</label>
        <input className="form-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label className="form-label" htmlFor="password">Contraseña:</label>
        <input className="form-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="form-button" type="button" onClick={handleLogin}>
          Iniciar Sesion
        </button>
      </form>
      <p className="form-link">
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default LoginForm;