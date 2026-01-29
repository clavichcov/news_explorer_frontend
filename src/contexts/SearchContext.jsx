import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchKeywords, setSearchKeywords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const performSearch = (query) => {
        const keywords = query.trim()
            .split(/[\s,]+/)
            .filter(word => word.length > 0)
            .map(word => word.toLowerCase());
        
        setSearchQuery(query);
        setSearchKeywords(keywords);
        setIsSearching(true);
        setSearchError(null);
    };

    const updateResults = (articles) => {
        setSearchResults(articles);
        setIsSearching(false);
    };

    const setError = (error) => {
        setSearchError(error);
        setIsSearching(false);
    };

    const clearSearch = () => {
        setSearchKeyword('');
        setSearchResults([]);
        setIsSearching(false);
        setSearchError(null);
    };

    return (
        <SearchContext.Provider value={{
            searchQuery,       
            searchKeywords,    
            searchResults,
            isSearching,
            searchError,
            performSearch,
            updateResults,
            setError,
            clearSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch debe usarse dentro de SearchProvider');
    }
    return context;
};