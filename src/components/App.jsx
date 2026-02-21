import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Header } from '../components/Header/Header.jsx';
import { Login } from '../components/Login/Login.jsx';
import { Register }  from './Register/Register.jsx';
import { SuccessRegister } from './Popup/SuccessRegister/SuccessRegister.jsx';
import { Main } from './pages/Main/Main.jsx';
import { Savednews } from './pages/Savednews/Savednews.jsx';
import { SavedNewsHeader } from './Header/Savednewsheader.jsx';
import { Footer } from './Footer/Footer.jsx';
import { Popup } from './Popup/Popup.jsx';
import { API_BASE_URL } from '../utils/Constants.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import Api from '../utils/Api.js';
import * as auth from '../utils/Auth.js';
import { setToken, getToken, removeToken } from "../utils/Token.js";
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';
import { SearchProvider } from '../contexts/SearchContext.jsx';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [popup, setPopup] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userData, setUserData] = useState({username:"", email:"", name:"Tales"}); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('login');
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPath, setCurrentPath] = useState("/");
    const [savedArticles, setSavedArticles] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleCards, setVisibleCards] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    
    const openLoginPopup = () => {
        setPopupType('login');
        setIsPopupOpen(true);
    };
    const openRegisterPopup = () => {
        setPopupType('register');
        setIsPopupOpen(true);
    };

    const openSuccessRegisterPopup = () => {
        setPopupType('successregister');
        setIsPopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsPopupOpen(false);
        setPopupType('login');
        navigate('/');
    };

    const handleLogin = ({ email, password }) => {
            
        if (!email || !password) {
                return;
            }
            
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setToken(data.token);
                    setIsLoggedIn(true);
                    setCurrentUser({
                        username: email.split('@')[0],
                        email: email
                    });
                    closeAllPopups(); 
                }
            })
            .catch(error => {
                console.error('Error en login:', error);
                alert('Error al iniciar sesión. Verifica tus credenciales.');
            });
    };

    const handleSuccessRegister = () => {
        console.log('handleSuccessRegister called');
        navigate('/signin');
        setPopupType('login');
        openLoginPopup();
    }

    const handleRegister = async ({ email, password, name }) => {
        if (!email || !password || !name) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        try {
            const data = await auth.register(email, password, name);
            openSuccessRegisterPopup();
        } catch (error) {
            console.error("Error en registro:", error);
            let errorMessage = 'Error en el registro';
            if (error.message) {
            errorMessage = error.message;
            } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
            } else if (error.status === 409) {
            errorMessage = 'El correo electrónico ya está registrado';
            }
            throw new Error(errorMessage);
        }
    };
    
    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate('/');

    };

    const createApiAccess = () => {
        const jwt = getToken();
        if (!jwt) return null;

        return new Api({
        baseUrl: API_BASE_URL,
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        }
        });
    };

    function onSaveArticle (data) {
            console.log ('Guardar artículo con ID:', data);
            if (isLoggedIn) {
                apiAcces.addArticle(data)
                .then(addedArticle => {
                    //setCards([addedArticle, ...cards]);
                        setCards(cards.map(card => 
                            card.id === data.id ? { 
                                ...card, 
                                _id: addedArticle._id,
                                isSaved: true } : card
                        ));
                })
                .catch(error => console.error('Error al añadir el artículo:', error));
            } else {
                return alert('Inicia sesión para guardar artículos');
            }
        }
    
        function onDeleteArticle (data) {
            console.log ('Eliminar artículo con ID:', data.id);
            if (isLoggedIn) {
                apiAcces.deleteArticle(data._id)
                .then(() => {
                    setCards(cards.filter(card => card.id !== data.id));    
                })
                .catch(error => console.error('Error al eliminar el artículo:', error));
            }
        }
    
        function handleBookmarkClick (data) {
            if (currentPath === "/"){
                if (data.isSaved) {
                    onDeleteArticle(data);
                } else {
                    onSaveArticle(data);
                }  
            }
        };
    
        const handleLoadMore = () => {
            setLoadingMore(true);
            
            setTimeout(() => {
                setVisibleCards(prev => prev + 3);
                setLoadingMore(false);
            }, 1000);
        };

    useEffect(() => {
        const checkBackground = () => {
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        
        if (bgColor === "rgb(255, 255, 255)" || bgColor === "#ffffff") {
            document.body.classList.add("dark-cursor");
        } else {
            document.body.classList.remove("dark-cursor");
        }
    };

    checkBackground();
    });

    useEffect(() => {
        const jwt = getToken();
        if (jwt) {
            const apiInstance = createApiAccess();
            if (apiInstance) {
                apiInstance.getUserInfo()
                    .then((userData) => {
                        setCurrentUser({
                            username: userData.data.name,
                            email: userData.data.email
                        });
                        setIsLoggedIn(true);
                    })
                                    .catch((error) => {
                    console.error('Error al verificar token:', error);
                    if (error.status === 401) {
                        removeToken();
                        setIsLoggedIn(false);
                        setCurrentUser(null);
                    }
                });
            }
        }
    }, []);
    useEffect(() => {
        
        if (location.pathname === '/signin') {
            if (popupType !== 'successregister') {
                setPopupType('login');
                setIsPopupOpen(true);
            }
        } else if (location.pathname === '/signup') {
            setPopupType('register');
            setIsPopupOpen(true);
        } else {
            setIsPopupOpen(false);
        }   
    }, [location.pathname]);

    return (
        <>
            <CurrentUserContext.Provider value={{ 
                isLoggedIn, 
                setIsLoggedIn,
                currentUser,
                setCurrentUser,
                handleLogin,
                handleLogout,
                handleSuccessRegister,
                currentPath,
                setCurrentPath,
                openLoginPopup,
                openRegisterPopup,
                openSuccessRegisterPopup,
                

                }}>
            
                <SearchProvider>
                    <div className="app">
                        <Routes>
                            
                            <Route path="/" 
                                element={
                                    <>
                                        <Header 
                                            isLoggedIn={isLoggedIn}
                                            onLogout={handleLogout}
                                            isName={currentUser?.username || ''}
                                            currentPath="/"
                                        />
                                        <Main 
                                            isLoggedIn={isLoggedIn} 
                                            onLogout={handleLogout} 
                                            currentPath="/" 
                                            handleLoadMore={handleLoadMore}
                                            handleBookmarkClick={handleBookmarkClick} />
                                        <Footer currentPath="/"/>
                                    </>
                                    
                                } 
                            />
                            
                            
                            <Route 
                                path="/signin" 
                                element={
                                    <>
                                        <div className="popup-route">
                                            <Header 
                                                isLoggedIn={isLoggedIn}
                                                onLogout={handleLogout}
                                                isName={currentUser?.username || ''}
                                                currentPath="/signin"
                                            />
                                            <Main isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                                            <Footer currentPath="/signin"/>
                                        </div>
                                        
                                    </>
                                } 
                            />
                            
                            
                            <Route 
                                path="/signup" 
                                element={
                                    <>
                                        <div className="popup-route">
                                            <Header 
                                            isLoggedIn={isLoggedIn}
                                            onLogout={handleLogout}
                                            handleSuccessRegister={handleSuccessRegister}
                                            isName={currentUser?.username || ''}
                                            currentPath="/signup"
                                        />
                                            <Main isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                                            <Footer currentPath="/signup"/>
                                        </div>
                                        
                                    </>
                                } 
                            />
                            
                            
                            <Route 
                                path="/savednews" 
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <>
                                            <SavedNewsHeader 
                                                isLoggedIn={isLoggedIn} 
                                                onLogout={handleLogout}
                                                savedArticles={savedArticles}
                                                isName={currentUser?.username || ''}
                                                currentPath="/savednews"
                                            />
                                            <Savednews 
                                                isLoggedIn={isLoggedIn} 
                                                onLogout={handleLogout}
                                                handleLoadMore={handleLoadMore}
                                                handleBookmarkClick={handleBookmarkClick}
                                                currentPath="/savednews"
                                                onArticlesLoaded={setSavedArticles}
                                            />
                                            <Footer currentPath="/savednews"/>
                                        </>
                                    </ProtectedRoute>
                                } 
                            />
                            
                            <Route 
                                path="/users/me" 
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <>
                                            <Header 
                                                isLoggedIn={isLoggedIn}
                                                onLogout={handleLogout}
                                                isName={currentUser?.username || ''}
                                            />
                                            <Main apiAcces={createApiAccess} />
                                            <Footer 
                                                isLoggedIn={isLoggedIn} 
                                                onLogout={handleLogout}
                                                currentPath="/users/me"
                                                />
                                        </>
                                    </ProtectedRoute>
                                } 
                            />
                            
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                        {(location.pathname === '/signin' || location.pathname === '/signup') && (
                            <Popup 
                                onClose={closeAllPopups} 
                                title={ popupType === 'login' ? "Iniciar sesión" :
                                        popupType === 'register' ? "Inscribirse" :
                                        popupType === 'successregister' ? "¡El registro se ha completado éxito!" : ""}
                            >
                                {popupType === 'login' && (
                                    <Login handleLogin={handleLogin} />
                                )}

                                {popupType === 'register' && (
                                    <Register  handleRegister={handleRegister} />
                                )}

                                {popupType === 'successregister' && (
                                    <SuccessRegister handleSuccessRegister={handleSuccessRegister} />
                                )}
                            
                            </Popup>
                        )}
                        
                        
                    </div>
                </SearchProvider>
            </CurrentUserContext.Provider>
        </>
  )
}

export default App
