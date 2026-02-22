import { About } from '../../About/About.jsx';
import { Articles } from '../../Articles/Articles.jsx';
import './Main.css'

export function Main({
    isLoggedIn, onLogout, currentPath, 
    handleBookmarkClick, handleBookmarkIcon, handleLoadMore, 
    visibleCardsHome, loadingMore, 
    setVisibleCardsHome, setLoadingMore, cards, setCards
}) {
    
    return (
        <main className="main">
            <Articles 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                currentPath={currentPath} 
                handleLoadMore={handleLoadMore}
                handleBookmarkClick={handleBookmarkClick}
                handleBookmarkIcon={handleBookmarkIcon}
                visibleCardsHome={visibleCardsHome}
                setVisibleCardsHome={setVisibleCardsHome}
                loadingMore={loadingMore}
                setLoadingMore={setLoadingMore}
                cards={cards}
                setCards={setCards}
            >

            </Articles>
            <About></About>

        </main>
    );
    
}

export default Main;