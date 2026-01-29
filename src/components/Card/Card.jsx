import React, {useState, useRef, useEffect} from 'react';
import {IMAGES} from '../../utils/Constants.js';
import './Card.css'

export function Card({data, isLoggedIn, onLogout, currentPath}) {
    const [isHovered, setIsHovered] = useState(false);
    const tooltipRef = useRef(null);
    const onSaveArticle = (data) => () => {
        console.log ('Guardar artículo con ID:', data);
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        if (tooltipRef.current) {
            if (!isLoggedIn && isHovered) {
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
                        <p className='card__source'>{data.source.name}</p>
                    </div>
                        <button className="card__button" 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={onSaveArticle(data)}
                            >
                            <img src={
                                isLoggedIn ? IMAGES.bookmark_active : IMAGES.bookmark_disabled}
                                 alt="Icono de marcador" 
                            />
                        </button>
                        <p className="card__tooltip" ref={tooltipRef}>Inicia sesión para guardar artículos</p>
                        <p className="card__keyword" 
                            style={{ display: isLoggedIn && currentPath === "/savednews" ? "block" : "none" }}>
                            {data.keyword}
                        </p>
                </div>
                
            </section>
        </>
    );
    
}