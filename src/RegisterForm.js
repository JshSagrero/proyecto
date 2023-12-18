// Importa las dependencias necesarias
import React, { useState } from 'react';

const RegisterForm = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: '',
  });

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía los datos del formulario al servidor PHP
      const response = await fetch('http://localhost:8081/127.0.0.1/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registro exitoso
        alert('Registro exitoso');
      } else {
        // Error en el registro
        alert('Hubo un problema al registrar. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al registrar. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Correo electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="contrasena">Contraseña:</label>
      <input
        type="password"
        id="contrasena"
        name="contrasena"
        value={formData.contrasena}
        onChange={handleChange}
        required
      />

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterForm;
