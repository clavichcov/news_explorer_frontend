import { About } from '../../About/About.jsx';
import { Articles } from '../../Articles/Articles.jsx';
import './Main.css'

export function Main({isLoggedIn, onLogout, currentPath, handleBookmarkClick, handleLoadMore, visibleCards, loadingMore}) {
    
    return (
        <main className="main">
            <Articles 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                currentPath={currentPath} 
                handleLoadMore={handleLoadMore}
                handleBookmarkClick={handleBookmarkClick}
                visibleCards={visibleCards}
                loadingMore={loadingMore}
            >

            </Articles>
            <About></About>

        </main>
    );
    
}

export default Main;