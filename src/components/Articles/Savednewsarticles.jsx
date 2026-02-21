import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import { Card } from '../Card/Card.jsx';
import { Preloader } from '../Preloader/Preloader.jsx';
import {IMAGES, API_BASE_URL} from '../../utils/Constants.js';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { Api } from '../../utils/Api.js';
import { getToken} from "../../utils/Token.js";
import './Savednewsarticles.css'

export function SavedNewsArticles({ 
    onArticlesLoaded, currentPath, handleBookmarkClick, 
    handleLoadMore, visibleCards, loadingMore,
    setVisibleCards, setLoadingMore
}) {
    
    const [ cards, setCards ] = useState([]);
    //const [visibleCards, setVisibleCards] = useState(3);
    //const [loadingMore, setLoadingMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { searchQuery, searchKeywords, isSearching, searchResults, updateResults, setError, performSearch } = useSearch();
    const [articlesByKeyword, setArticlesByKeyword] = useState({});

    
    useEffect(() => {
        const fetchSavedArticles = async () => {
            setIsLoading(true);
            try {
                const jwt = getToken();
                const api = new Api({
                    baseUrl: API_BASE_URL,
                    headers: { Authorization: `Bearer ${jwt}` }
                });
                
                const savedArticles = await api.getSavedArticles(); 
                setCards(savedArticles.data);
                if (onArticlesLoaded) {
                    onArticlesLoaded(savedArticles.data);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

    if (getToken()) {
        fetchSavedArticles();
    }
    }, []);

    return (
        <>
            <section className="articles">
                <div className="articles__search">
                    
                    {isLoading ? (
                        <Preloader />
                    ) : null}
                    
                    {!isLoading && cards.length > 0 ? (
                        <div className="articles__container">
                            <div className="articles__cards">
                                {cards.slice(0, visibleCards).map(card => (
                                    <Card 
                                        key={card.id} 
                                        data={card}
                                        handleBookmarkClick={handleBookmarkClick}
                                        currentPath={currentPath} 
                                    />
                                ))}
                            </div>
                            {loadingMore && (
                                <div style={{textAlign: 'center', margin: '20px 0'}}>
                                    <Preloader text="Cargando más artículos..." />
                                </div>
                            )}
                            {visibleCards < cards.length && (
                                <button className="articles__button" onClick={handleLoadMore}>
                                    Ver más
                                </button>
                            )}
                        </div>
                    ) : null}
                    
                    
                    
                    {/*!isLoading && cards.length === 0 &&  (
                        <div className="articles__notfound">
                            <img className="articles__notfound--image" src={IMAGES.notfound} alt="Imagen lupa carita triste"/>
                            <h3 className="articles__notfound--title">No se han encontrado artículos</h3>
                            
                        </div>
                    )*/}
                </div>
            </section>
            
        </>
    );
    
}