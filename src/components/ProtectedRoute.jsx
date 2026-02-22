import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Preloader } from "./Preloader";
import CurrentUserContext from "../contexts/CurrentUserContext";


export default function ProtectedRoute({
    isLoading, 
    children,
    anonymous= false,
    }) {
        const location = useLocation();
        const from = location.state?.from || "/";
        const { isLoggedIn } = useContext(CurrentUserContext);
        
        if (isLoading){
            return (
                <div className="preloader">
                    <Preloader />
                </div>    
            );
        }
        if (anonymous && isLoggedIn) {
            return <Navigate to={from} />;
        }
        if(!anonymous && !isLoggedIn){
            return <Navigate to="/signin" state={{from: location }} />;
        }
        return children;
    }
    
