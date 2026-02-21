import { About } from '../../About/About.jsx';
import { Articles } from '../../Articles/Articles.jsx';
import './Main.css'

export function Main({isLoggedIn, onLogout, currentPath, handleBookmarkClick, handleLoadMore}) {
    
    return (
        <main className="main">
            <Articles 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                currentPath={currentPath} 
                handleLoadMore={handleLoadMore}
                handleBookmarkClick={handleBookmarkClick}
            >

            </Articles>
            <About></About>

        </main>
    );
    
}

export default Main;