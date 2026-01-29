import './Preloader.css'

export function Preloader({ text = "Buscando noticias..." }) {
    
    
    return (
        <>
            <div className="preloader__backdrop">
                <i className="preloader__backdrop--spinner"></i>
                <p className="preloader__backdrop--text">{text}</p>
            </div>
            
        </>
    );
    
}