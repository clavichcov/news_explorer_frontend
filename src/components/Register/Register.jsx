import { RegisterPopup } from "../Popup/Register/Register.jsx";
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

export function Register({ handleRegister }) {
  const navigate = useNavigate(); 
  
  return (
    <> 
        <RegisterPopup 
            handleRegister={handleRegister}
            
        />
    </>
  );
}