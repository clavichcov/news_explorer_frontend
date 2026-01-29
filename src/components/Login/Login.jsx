import { LoginPopup } from "../Popup/Login/Login.jsx";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export function Login({ handleLogin }) {
    const navigate = useNavigate();
    
    return (
        <>
            <LoginPopup 
                handleLogin={handleLogin}
                
            />
        </>
    );
}