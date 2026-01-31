import { useEffect } from 'react';
import {IMAGES} from '../../utils/Constants.js';
import './Popup.css';

export function Popup (props) {
    const {onClose, title, children} = props;
    
    const handleOverlayClick = (e) => {
        
        if (e.target.classList.contains('popup')) {
            onClose();
        }
    };

    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, []);
    
    return (
        <div 
            className="popup"
            onClick={handleOverlayClick}
        >
            
            <div className={`popup__container  ${
                    !title ? "popup--image-content" : "popup__container"
                    }`}>
                {!title && (
                    <>
                        {children}
                        <button
                            style={{backgroundImage: `url(${IMAGES.close_icon})`}}
                            aria-label="Close modal"
                            className="popup--image-close-button"
                            type="button"
                            onClick={onClose}
                        />
                    </>
                )}    
                {title && (
                    <>
                        <div className="popup__container_form">
                            <h3 className="popup__title">{title}</h3>
                            {children}
                    
                        </div>
                        <button
                            style={{backgroundImage: `url(${IMAGES.close_icon})`}}
                            aria-label="Close modal"
                            className="popup__close_button"
                            type="button"
                            onClick={onClose}
                        />
                    </>
                    
                )} 
                
            </div>
        </div>
    );
}

