import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {IMAGES} from '../../utils/Constants.js';
import './Footer.css'; 

export function Footer({currentPath}) {

    const location = useLocation();
        
        const handleHomeClick = () => {
            if (location.pathname === currentPath) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
        };

        const handlePracticiumClick = () => {
            window.open('https://www.almedart.com/', '_blank');
        }

    return (
        <footer className= "footer">
                <p className="footer__copyright">&copy; 2021 Supersite, Powered by News API</p>
                <div className="footer__bar--container">
                    <div className="footer__container--buttons">
                        <div className="footer__command--buttons">
                            <button className="footer__command--button footer__button--home" 
                                onClick={handleHomeClick}>Inicio
                            </button>
                            <button className="footer__command--button footer__button--practicium" 
                                onClick={handlePracticiumClick}>Practicum
                            </button>
                        </div>
                        <div className="footer__social--buttons">
                            <a 
                                href="https://github.com/clavichcov/news_explorer_frontend" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer__social--buttons-btn"
                                aria-label="Visitar mi perfil de GitHub"
                            >
                                <img 
                                    src={IMAGES.github}
                                    alt="Icono de GitHub" 
                                    className="footer__social--buttons-btn"
                                />
                            </a>
                            <a 
                                href="https://www.facebook.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer__social--buttons-btn"
                                aria-label="Visitar mi perfil de Facebook"
                            >
                                <img 
                                    src={IMAGES.facebook}
                                    alt="Icono de Facebook" 
                                    className="footer__social--buttons-btn"
                                />
                            </a>
                            
                        </div>
                    </div>
                    
                </div>
        </footer>
    );
};
