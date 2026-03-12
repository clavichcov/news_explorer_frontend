import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Login.css';
export function LoginPopup({handleLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const location = useLocation();

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
    }
    if (serverError) setServerError("");
  };

  const isFormValid = useMemo(() => {
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    
    return {
      isValid: !emailError && !passwordError && email.trim() && password.trim(),
      emailError,
      passwordError
    };
  }, [email, password, validateField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: formValidity.emailError,
      password: formValidity.passwordError
    });
    if (!formValidity.isValid) {
      return;
    }
    
    try {
      setServerError(""); 
      await handleLogin({ email, password });
    } catch (error) {
      setServerError(error.message || "Error en el inicio de sesión. Intenta nuevamente.");
    }
  };
  
  const handleOpenRegister = () => {
        navigate('/signup');
        
    }
  
  return (
    <form
      className="form__login"
      name="form-login"
      id="form--login"
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
      <button 
        className={isFormValid() ? 'form__login_submit-enabled' : 'form__login_submit-disabled'}
        type="submit"
        disabled={!isFormValid()}
      >
        Iniciar sesión
      </button>

      <p className="form__text">
        o &nbsp;<a className="form__text--link" 
        onClick={handleOpenRegister}
        >inscribirse</a>
      </p>
      
    </form>
  );
}