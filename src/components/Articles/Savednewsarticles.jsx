import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import { Card } from '../Card/Card.jsx';
import { Preloader } from '../Preloader/Preloader.jsx';
import {IMAGES} from '../../utils/Constants.js';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { newsApi } from '../../utils/Thirdpartyapi.js';
import './Savednewsarticles.css'

export function SavedNewsArticles() {
    
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

    useEffect(() => {
        
    },);

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
                    
                    {isLoading ? (
                        <Preloader />
                    ) : null}
                    
                    {!isLoading && cards.length > 0 ? (
                        <div className="articles__container">
                            <div className="articles__cards">
                                {cards.slice(0, visibleCards).map(card => (
                                    <Card key={card.id} data={card} />
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