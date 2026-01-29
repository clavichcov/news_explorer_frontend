import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import { Card } from '../Card/Card.jsx';
import { Preloader } from '../Preloader/preloader.jsx';
import {IMAGES} from '../../utils/Constants.js';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { newsApi } from '../../utils/ThirdPartyApi.js';
import './Articles.css'

export function Articles() {
    
    const [ cards, setCards ] = useState([]);
    const [visibleCards, setVisibleCards] = useState(3);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { searchQuery, searchKeywords, isSearching, searchResults, updateResults, setError, performSearch } = useSearch();
    const [articlesByKeyword, setArticlesByKeyword] = useState({});

    /*const loadInitialCards = async () => {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
        const mockData = [
            { id: 1, urlToImage: IMAGES.cardimg, title: 'Artículo 1', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 1' } },
            { id: 2, urlToImage: IMAGES.cardimg, title: 'Artículo 2', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 2' } },
            { id: 3, urlToImage: IMAGES.cardimg, title: 'Artículo 3', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 3' } },
            { id: 4, urlToImage: IMAGES.cardimg, title: 'Artículo 4', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 4' } },
            { id: 5, urlToImage: IMAGES.cardimg, title: 'Artículo 5', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 5' } },
            { id: 6, urlToImage: IMAGES.cardimg, title: 'Artículo 6', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 6' } },
            { id: 7, urlToImage: IMAGES.cardimg, title: 'Artículo 7', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 7' } },
            { id: 8, urlToImage: IMAGES.cardimg, title: 'Artículo 8', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 8' } },
            { id: 9, urlToImage: IMAGES.cardimg, title: 'Artículo 9', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultriciesnuls nunc eget nisl.`, publishedAt: new Date(), source: { name: 'Fuente 9' } }
        ];
        
        setCards(mockData);
        setIsLoading(false);
    };*/

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
            <section className= "savednews">
                <div className="savednews__search">
                    <h2 className="savednews__search--title">Resultados de búsqueda</h2>
                    {isLoading ? (
                            <Preloader/>
                        ): cards.length > 0 ? (
                            <div className="savednews__container">
                                <div className="savednews__cards">
                                    {
                                        cards.slice(0, visibleCards).map(card => (
                                            <Card key={card.id} data={card} />
                                        )
                                    )}                                  
                                    
                                </div>
                                    {loadingMore && (
                                        <div style={{textAlign: 'center', margin: '20px 0'}}>
                                            <Preloader text="Cargando más artículos..." />
                                            
                                        </div>
                                    )}
                                    {visibleCards < cards.length && (
                                        <button className="savednews__button" onClick={handleLoadMore}>Ver más</button>
                                    )}
                        
                            </div>
                        ):  searchKeywords ? (
                            (
                                <div className="savednews__notfound">
                                    <img className="savednews__notfound--image" src={IMAGES.notfound} alt="Imagen lupa carita triste"/>
                                    <h3 className="savednews__notfound--title">No se han encontrado artículos</h3>
                                    <p className="savednews__notfound--text">Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.</p>
                                </div>
                            )
                        ): (
                                <div className="savednews__initial">
                                <p>Realiza una búsqueda para ver artículos aquí.</p>
                                </div>
                            )   
                    }
                
                    </div>
                
            
            </section>
            
        </>
    );
    
}