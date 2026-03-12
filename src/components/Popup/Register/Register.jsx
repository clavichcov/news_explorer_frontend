import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';
export function RegisterPopup({handleRegister}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: ""
  });
  const navigate = useNavigate();
  
  const validateField = useCallback((fieldName, value) => {
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
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "email-input") {
      setEmail(value);
      setErrors(prev => ({ ...prev, email: validateField("email", value) }));
    } else if (name === "password-input") {
        setPassword(value);
        setErrors(prev => ({ ...prev, password: validateField("password", value) }));
    } else if (name === "name-input") {
        setName(value);
        setErrors(prev => ({ ...prev, name: validateField("name", value) }));
    }
    if (serverError) setServerError("");
  };

  const formValidity = useMemo(() => {
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    const nameError = validateField("name", name);
    
    return {
      isValid: !emailError && !passwordError && !nameError 
      && email.trim() && password.trim() && name.trim(),
      emailError,
      passwordError,
      nameError
    };
  }, [email, password, name, validateField]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    const nameError = validateField("name", name);
    
    setErrors({
      email: formValidity.emailError,
      password: formValidity.passwordError,
      name: formValidity.nameError
    });
    
    if (!formValidity.isValid) {
      return;
    }
    try {
      setServerError(""); 
      await handleRegister({ email, password, name });
    } catch (error) {
        setServerError(error.message || "Error en el registro. Intenta nuevamente.");
      } 

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
      {serverError && (
          <span 
            className="form__popup--error form__popup--error_active form__popup--error_server" 
            id="server-error"
          >
            {serverError}
          </span>
        )}
      <button 
        className={formValidity.isValid ? 
          'form__login_submit-enabled' : 'form__login_submit-disabled'}
        type="submit"
        disabled={!formValidity.isValid}
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