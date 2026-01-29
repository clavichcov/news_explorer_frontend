import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import {IMAGES} from '../../utils/Constants.js';
import './About.css'

export function About() {
    
    
    return (
        <>
            <section className="about">
                <div className="about__image">
                    <img className="about__image--img" src={IMAGES.about} alt="Imagen del autor"/>
                </div>
                <div className="about__description">
                    <h2 className="about__title">Acerca del autor</h2>
                    <p className="about__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
                        nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl. 
                        Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget ultricies nisl 
                        nunc eget nisl.
                    </p>
                    <p className="about__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
                    </p>
                </div>

            </section>
        </>
    );
    
}