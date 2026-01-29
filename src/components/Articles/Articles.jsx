import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import { Card } from '../Card/Card.jsx';
import { Preloader } from '../Preloader/preloader.jsx';
import {IMAGES} from '../../utils/Constants.js';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { newsApi } from '../../utils/ThirdPartyApi.js';
import './Articles.css'

export function Articles({ isLoggedIn, onLogout, currentPath }) {
    
    const [ cards, setCards ] = useState([]);
    const [visibleCards, setVisibleCards] = useState(3);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { searchQuery, searchKeywords, isSearching, searchResults, updateResults, setError, performSearch } = useSearch();
    const [articlesByKeyword, setArticlesByKeyword] = useState({});

    const findRelevantKeyword = (title, keywords) => {
        if (!title || !keywords || keywords.length === 0) return null;
        const titleLower = title.toLowerCase();
        
        
        for (const keyword of keywords) {
            if (titleLower.includes(keyword.toLowerCase())) {
                return keyword;
            }
        }
        
        return keywords[0];
    };

    const performNewsSearch = async (query, keywords) => {
        setIsLoading(true);
                    
        try {
            const data = await newsApi.searchNews(query);
                
            if (!data.articles || data.articles.length === 0) {
                setCards([]);
                return;
            }
                
            const formattedArticles = data.articles.map((article, index) => ({
                id: `${query}-${index}-${Date.now()}`,
                urlToImage: article.urlToImage,
                title: article.title,
                description: article.description,
                publishedAt: article.publishedAt,
                source: { 
                    name: article.source?.name 
                },
                keyword: findRelevantKeyword(article.title, keywords)
            }));

            setCards(prev => {
                const uniqueArticles = formattedArticles.filter(newArticle => 
                    !prev.some(existingArticle => 
                        existingArticle.title === newArticle.title
                    )
                );
                return [...prev, ...uniqueArticles];
            });
            
            setVisibleCards(3);
                            
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            setError(error.message);
            setCards([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery && searchKeywords && searchKeywords.length > 0) {
            performNewsSearch(searchQuery, searchKeywords);
        }
    }, [searchQuery, searchKeywords]);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        setVisibleCards(prev => {
            const newValue = prev + 3;
            return newValue;
        });
            
        setLoadingMore(false);
    };

    return (
        <>
            <section className="articles">
                <div className="articles__search">
                    <h2 className="articles__search--title">Resultados de búsqueda</h2>
                    
                    {isLoading ? (
                        <Preloader />
                    ) : null}
                    
                    {!isLoading && cards.length > 0 ? (
                        <div className="articles__container">
                            <div className="articles__cards">
                                {cards.slice(0, visibleCards).map(card => (
                                    <Card key={card.id} data={card} 
                                        isLoggedIn={isLoggedIn} 
                                        onLogout={onLogout} 
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
                    
                    {!isLoading && cards.length === 0 && !searchQuery && (
                        <div className="articles__initial">
                            <p>Realiza una búsqueda para ver artículos aquí.</p>
                        </div>
                    )}
                    
                    {!isLoading && cards.length === 0 && searchQuery && (
                        <div className="articles__notfound">
                            <img className="articles__notfound--image" src={IMAGES.notfound} alt="Imagen lupa carita triste"/>
                            <h3 className="articles__notfound--title">No se han encontrado artículos</h3>
                            <p className="articles__notfound--text">
                                Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
                            </p>
                        </div>
                    )}
                </div>
            </section>
            
        </>
    );
    
}