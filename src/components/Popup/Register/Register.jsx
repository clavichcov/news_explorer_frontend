import { useState, use } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './Register.css';
export function RegisterPopup({handleRegister}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: ""
  });
  const navigate = useNavigate();
  const location = useLocation();

  const validateField = (fieldName, value) => {
    let error = "";
    
    if (!value.trim()) {
      error = "Este campo es obligatorio";
    } else if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Por favor ingresa un correo electrónico válido";
      }
    } else if (fieldName === "password") {
      if (value.length < 8) {
        error = "La contraseña debe tener al menos 8 caracteres";
      }
    } else if (fieldName === "name") {
        if (value.length < 3) {
                    error = "El nombre debe tener al menos 3 caracteres";
                }
            }
    
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "email-input") {
      setEmail(value);
    } else if (name === "password-input") {
        setPassword(value);
    } else if (name === "name-input") {
        setName(value);
    }
    
    const fieldName = name === "email-input" ? "email" : 
                  name === "password-input" ? "password" : 
                  "name";
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldName = name === "email-input" ? "email" : 
                  name === "password-input" ? "password" : 
                  "name";
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    const nameError = validateField("name", name);
    
    setErrors({
      email: emailError,
      password: passwordError,
      name: nameError
    });
    
    if (emailError || passwordError || nameError) {
      return;
    }
    
    
    handleRegister({ email, password, name });

  };
  
  
  return (
    <form
      className="form__register"
      name="form-register"
      id="form--register"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="form__wrapper">
        <p className="form__label">Correo electrónico</p>
        <input
          className={`form__input form__input_type_email ${errors.email ? "form__input-error" : ""}`}
          id="email-input"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength="30"
          minLength="2"
          name="email-input"
          placeholder="Introduce tu correo electrónico"
          required
          type="email"
        />
        <span 
          className={`form__popup--error ${errors.email ? "form__popup--error_active" : ""}`} 
          id="email-input-error"
        >
          {errors.email}
        </span>
      </label>
      <label className="form__wrapper">
        <p className="form__label">Contraseña</p>
        <input
          className={`form__input form__input_type_password ${errors.password ? "form__input-error" : ""}`}
          id="password-input"
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password-input"
          placeholder="Introduce tu contraseña"
          required
          type="password"
        />
        <span 
          className={`form__popup--error ${errors.password ? "form__popup--error_active" : ""}`} 
          id="password-input-error"
        >
          {errors.password}
        </span>
      </label>
      <label className="form__wrapper">
        <p className="form__label">Nombre de usuario</p>
        <input
          className={`form__input form__input_type_name ${errors.name ? "form__input-error" : ""}`}
          id="name-input"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength="30"
          minLength="2"
          name="name-input"
          placeholder="Introduce tu nombre de usuario"
          required
          type="text"
        />
        <span 
          className={`form__popup--error ${errors.name ? "form__popup--error_active" : ""}`} 
          id="name-input-error"
        >
          {errors.name}
        </span>
      </label>
      <span 
          className={`form__popup--error ${errors.email ? "form__popup--error_active" : ""}`} 
          id="name-input-error"
        >
          {errors.name}
        </span>
      <button 
        className={`${errors.email || errors.password || errors.name ? 'form__login_submit-disabled' : 'form__login_submit-enabled'}`}
        type="submit"
        disabled={!!(errors.email || errors.password || errors.name)}
      >
        Inscribirse
      </button>

      <p className="form__text">
        o &nbsp;<a className="form__text--link" 
        onClick={() => navigate('/signin')}
        >iniciar sesión</a>
      </p>
      
    </form>
  );
}