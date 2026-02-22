import React, { useState, useEffect, useContext } from 'react';
import { Card } from '../Card/Card.jsx';
import { Preloader } from '../Preloader/Preloader.jsx';
import { IMAGES, API_BASE_URL } from '../../utils/Constants.js';
import { useSearch } from '../../contexts/SearchContext.jsx';
import { newsApi } from '../../utils/Thirdpartyapi.js';
import './Articles.css'

export function Articles({ 
    isLoggedIn, onLogout, currentPath, 
    handleBookmarkClick, handleBookmarkIcon, handleLoadMore, 
    visibleCardsHome, loadingMore, setVisibleCardsHome, setLoadingMore 
}) {
    
    const [ cards, setCards ] = useState([]);
    const [ isSavedArticle, setIsSavedArticle ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { searchQuery, searchKeywords, setError } = useSearch();
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

    /*const performNewsSearch = async (query, keywords) => {
        setIsLoading(true);
        setCards([]);            
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
    };*/

    const performNewsSearch = async (query, keywords) => {
        setIsLoading(true);
        setCards([]); 
            
        try {
            const searchPromises = keywords.map(keyword => 
                newsApi.searchNews(keyword)
            );
            
            const results = await Promise.all(searchPromises);
            
            let allArticles = [];
            results.forEach((data, index) => {
                if (data.articles && data.articles.length > 0) {
                    const keyword = keywords[index];
                    const formattedArticles = data.articles.map((article, i) => ({
                        id: `${keyword}-${i}-${Date.now()}-${Math.random()}`,
                        url: article.url,
                        urlToImage: article.urlToImage,
                        title: article.title,
                        description: article.description,
                        publishedAt: article.publishedAt,
                        source: { name: article.source?.name },
                        isSaved: false,
                        keyword: keyword
                    }));
                    allArticles = [...allArticles, ...formattedArticles];
                }
            });
            
            const shuffledArticles = allArticles.sort(() => Math.random() - 0.5);
            
            const uniqueArticles = [];
            const titles = new Set();
            
            shuffledArticles.forEach(article => {
                if (!titles.has(article.title)) {
                    titles.add(article.title);
                    uniqueArticles.push(article);
                }
            });
            
            setCards(uniqueArticles);
            setVisibleCardsHome(3);
                            
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
    }, [searchQuery, searchKeywords]
    );

    return (
        <>
            <section className="articles">
                <div className="articles__search">
                    <h2 className="articles__search--title">Resultados de búsqueda</h2>
                    
                    {isLoading ? (
                        <div className="articles__preloader">
                            <Preloader />
                        </div>
                    ) : null}
                    
                    {!isLoading && cards.length > 0 ? (
                        <div className="articles__container">
                            <div className="articles__cards">
                                {cards.slice(0, visibleCardsHome).map(card => (
                                    <Card key={card.id} data={card} 
                                        isLoggedIn={isLoggedIn} 
                                        onLogout={onLogout} 
                                        currentPath={currentPath}
                                        handleBookmarkClick={handleBookmarkClick}
                                        handleBookmarkIcon={handleBookmarkIcon}
                                    />
                                ))}
                            </div>
                            {loadingMore && (
                                <div style={{textAlign: 'center', margin: '20px 0'}}>
                                    <Preloader text="Cargando más artículos..." />
                                </div>
                            )}
                            {visibleCardsHome < cards.length && (
                                <button className="articles__button" onClick={() => handleLoadMore(currentPath)}>
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