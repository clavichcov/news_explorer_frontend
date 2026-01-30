import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import './Header.css'
import {IMAGES} from '../../utils/Constants.js';
import { Login } from '../Login/Login.jsx';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { newsApi } from '../../utils/Thirdpartyapi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
//import { removeToken } from "../../utils/Token.js";

export function Header({isLoggedIn, onLogout, isName, currentPath}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const { performSearch, isSearching } = useSearch();
    
        
    const handleOpenLogin = () => {
        navigate('/signin');
        
    }   
    
    const handleHomeClick = () => {
        if (location.pathname === currentPath) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
               
    };

    const handleArticlesButton = () => {
        if (isLoggedIn) {
            navigate('/savednews');
        }
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        
        if (!searchInput.trim()) {
            alert('Por favor ingresa un término de búsqueda');
            return;
        }
    
        const keywords = searchInput.trim()
        .split(/[\s,]+/)
        .filter(word => word.length > 0) 
        .map(word => word.toLowerCase());

        performSearch(searchInput.trim());

        if (keywords.length === 0) {
            alert('Por favor ingresa al menos una palabra válida');
            return;
        }
        
        try {
            const searchQuery = keywords.join(' ');
            const data = await newsApi.searchNews(searchQuery);
            console.log('Resultados de búsqueda:', data.articles);
            const articlesSection = document.querySelector('.articles');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Error al buscar noticias. Por favor intenta nuevamente.');
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
        <header className="header">
            <div className={`header__bar ${isScrolled ? 'header__bar--scrolled' : ''}`}>
                <div className= "header__bar--containt">
                    <p className="header__bar--title" >News Explorer</p>
                    <div className="header__bar--container">
                        <div className="header__user--unlogged">
                            <button className="header__button header__button--home" onClick={handleHomeClick}>Inicio</button>
                        </div>
                            {isLoggedIn && (
                                
                                <div className="header__user--logged">
                                    <button 
                                        className="header__button header__button--articles" 
                                        onClick={handleArticlesButton}
                                    >
                                        Articulos guardados
                                    </button>
                                </div>
                            )}
                        <div>
                            {isLoggedIn ? (
                                <div className="header__user--logged">
                                    <button 
                                        className="header__button header__button--togle" 
                                        onClick={onLogout}>
                                        {isName}
                                        <img 
                                            src={IMAGES.logout_normal} 
                                            alt="Icono de cerrar sesión" 
                                            className="header__logout--icon"
                                        />
                                    </button>
                                </div>                            ) : (
                            <button 
                                className="header__button header__button--togle" 
                                onClick={handleOpenLogin}>
                                    Iniciar sesión
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__content">
                <h1 className="header__title">¿Que esta pasando <br></br> en el mundo?</h1>
                <p className="header__text">Encuentra las últimas noticias sobre cualquier
                     tema y guárdalas en tu cuenta personal.
                </p>
                <form className="header__search" onSubmit={handleSearchSubmit}>
                    <input 
                    type="text" 
                    placeholder="Introducir tema de búsqueda" 
                    className="header__search--input"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    disabled={isSearching}
                    />
                    <button 
                    className="header__search--button"
                    type="submit"
                    disabled={isSearching}
                    >
                        Buscar
                    </button>
                </form>
            </div>

        </header>
    );
    
}
