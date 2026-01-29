import { About } from '../../About/About.jsx';
import { Articles } from '../../Articles/Articles.jsx';
import './Main.css'

export function Main({isLoggedIn, onLogout, currentPath}) {
    
    return (
        <main className="main">
            <Articles isLoggedIn={isLoggedIn} onLogout={onLogout} currentPath={currentPath}></Articles>
            <About></About>

        </main>
    );
    
}

export default Main;