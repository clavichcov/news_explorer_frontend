import { About } from '../../About/About.jsx';
import { Articles } from '../../Articles/Articles.jsx';
import './Main.css'

export function Main({
    isLoggedIn, onLogout, currentPath, 
    handleBookmarkClick, handleLoadMore, 
    visibleCardsHome, loadingMore, 
    setVisibleCardsHome, setLoadingMore
}) {
    
    return (
        <main className="main">
            <Articles 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                currentPath={currentPath} 
                handleLoadMore={handleLoadMore}
                handleBookmarkClick={handleBookmarkClick}
                visibleCardsHome={visibleCardsHome}
                setVisibleCardsHome={setVisibleCardsHome}
                loadingMore={loadingMore}
                setLoadingMore={setLoadingMore}
            >

            </Articles>
            <About></About>

        </main>
    );
    
}

export default Main;