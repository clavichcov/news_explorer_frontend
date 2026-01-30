import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import './Savednewsheader.css'
import {IMAGES} from '../../utils/Constants.js';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { newsApi } from '../../utils/Thirdpartyapi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
//import { removeToken } from "../../utils/Token.js";

export function SavedNewsHeader({ isLoggedIn, onLogout, isName, currentPath, savedArticles = [] }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    

    const keywords = Array.from(
        new Set(savedArticles.flatMap(article => 
        article.keywords || []
        ))
    );

    const displayedKeywords = keywords.slice(0, 2);
    const remainingCount = keywords.length - 2;
    
    const handleHomeClick = () => {
        if (location.pathname === '/savednews') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
               
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="savedheader">
            <div className={`savedheader__bar ${isScrolled ? 'savedheader__bar--scrolled' : ''}`}>
                <div className= "savedheader__bar--containt">
                    <p className="savedheader__bar--title">News Explorer</p>
                    <div className="savedheader__bar--container">
                        <div className="savedheader__user--unlogged">
                            <button className="savedheader__button savedheader__button--home" onClick={handleHomeClick}>Inicio</button>
                        </div>
                            <div className="savedheader__user--logged">
                                <button className="savedheader__button savedheader__button--articles"
                                >
                                    Articulos guardados
                                </button>
                            </div>
                        <div>
                            {isLoggedIn ? (
                                <div className="savedheader__user--logged">
                                    <button 
                                        className="savedheader__button savedheader__button--togle" 
                                        onClick={onLogout}>
                                        {isName}
                                        <img 
                                            src={IMAGES.logout_savednews} 
                                            alt="Icono de cerrar sesión" 
                                            className="savedheader__logout--icon"
                                        />
                                    </button>
                                </div>                            ) : (
                                <button 
                                    className="savedheader__button savedheader__button--togle" 
                                    onClick={handleOpenLogin}>
                                        Iniciar sesión
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="savedheader__content">
                <p className="savedheader__text">Artículos guardados
                </p>
                <h1 className="savedheader__title">
                    {currentUser?.name || 'Usuario'}, tienes {savedArticles.length} 
                    {savedArticles.length === 1 ? ' artículo guardado' : ' artículos guardados'}
                </h1>
                <p className="savedheader__keywords">
                    
                        <>
                        Por palabras clave:{' '}
                        <span className="saved-news-header__keyword">
                            {displayedKeywords.join(', ')}
                        </span>
                        {remainingCount > 0 && (
                            <span className="saved-news-header__more-keywords">
                            y {remainingCount} más
                            </span>
                        )}
                        </>
                    
                    </p>
                
            </div>

        </header>
    );
    
}
