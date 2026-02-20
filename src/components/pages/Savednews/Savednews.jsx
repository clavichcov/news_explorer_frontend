import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import CurrentUserContext from '../../../contexts/CurrentUserContext.jsx';
import { SavedNewsArticles } from '../../Articles/Savednewsarticles.jsx';
import { IMAGES } from '../../../utils/Constants.js';
import './Savednews.css'

export function Savednews({ isLoggedIn, onLogout, currentPath }) {
    const [savedArticlesCount, setSavedArticlesCount] = useState(0);
    
    return (
        <main className="savednews">
            
            <SavedNewsArticles
                onArticlesLoaded={(articles) => {
                    setSavedArticlesCount(articles.length);
                    console.log('Artículos cargados:', articles);
                }}
            ></SavedNewsArticles>
            
        </main>
    );
    
}