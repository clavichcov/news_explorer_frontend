import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import CurrentUserContext from '../../../contexts/CurrentUserContext.jsx';
import { SavedNewsArticles } from '../../Articles/Savednewsarticles.jsx';
import { IMAGES } from '../../../utils/Constants.js';
import './Savednews.css'

export function Savednews() {
    
    
    return (
        <main className="savednews">
            
            <SavedNewsArticles></SavedNewsArticles>
            
        </main>
    );
    
}