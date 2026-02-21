import { About } from '../../About/About.jsx';
import { Articles } from '../../Articles/Articles.jsx';
import './Main.css'

export function Main({
    isLoggedIn, onLogout, currentPath, 
    handleBookmarkClick, handleLoadMore, 
    visibleCards, loadingMore, 
    setVisibleCards, setLoadingMore
}) {
    
    return (
        <main className="main">
            <Articles 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                currentPath={currentPath} 
                handleLoadMore={handleLoadMore}
                handleBookmarkClick={handleBookmarkClick}
                visibleCards={visibleCards}
                setVisibleCards={setVisibleCards}
                loadingMore={loadingMore}
                setLoadingMore={setLoadingMore}
            >

            </Articles>
            <About></About>

        </main>
    );
    
}

export default Main;