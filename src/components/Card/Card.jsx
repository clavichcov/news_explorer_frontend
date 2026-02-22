import React, {useState, useRef, useEffect} from 'react';
import {IMAGES} from '../../utils/Constants.js';
import './Card.css'

export function Card({data, isLoggedIn, onLogout, currentPath, handleBookmarkClick, handleBookmarkIcon}) {
    const [isHovered, setIsHovered] = useState(false);
    const tooltipRef = useRef(null);
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const getTooltipText = () => {
        if (currentPath === "/savednews") {
            return "Eliminar artículo guardado";
        
        }
        if (!isLoggedIn) {
            return "Inicia sesión para guardar artículos";
        }
        
            return data.isSaved ? "Artículo guardado" : "Guardar artículo";
        
    }

    function handleOnClick() {
        handleBookmarkClick(data, currentPath);
    }

    useEffect(() => {
        if (tooltipRef.current) {
            if (isHovered) {
                tooltipRef.current.style.display = 'block';
            } else {
                tooltipRef.current.style.display = 'none';
            }
        }
    }, [isHovered, isLoggedIn]);

    return (
        <>
            <section className="card">
                <div className='card_content'>
                    
                        <img className="card__image" src={data.urlToImage} alt="Imagen de la noticia"/>
                    
                    <div className="card__description">
                        <p className='card__date'>{formatDate(data.publishedAt)}</p>
                        <h2 className="card__title">{data.title}</h2>
                        <p className="card__text">{data.description}
                        </p>
                        <p className='card__source'>{data.source?.name || 'Fuente desconocida'}</p>
                    </div>
                        <button className="card__button" 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            
                            onClick={handleOnClick}
                            >
                            <img src={handleBookmarkIcon(data, currentPath)}
                                 alt="Icono de marcador" 
                            />
                        </button>
                        <p className="card__tooltip" ref={tooltipRef}>
                            {getTooltipText()}
                            </p>
                        <p className="card__keyword" 
                            style={{ display: isLoggedIn && currentPath === "/savednews" ? "block" : "none" }}>
                            {data.keyword}
                        </p>
                </div>
                
            </section>
        </>
    );
    
}