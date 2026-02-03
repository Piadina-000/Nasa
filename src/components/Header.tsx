/**
 * COMPONENTE HEADER - Barra di navigazione
 * 
 * Header che compare in tutte le pagine dell'app.
 * Contiene il logo e i link per navigare tra le sezioni principali:
 * - APOD: Astronomy Picture of the Day
 * - NEO: Near Earth Objects
 * 
 * Ho usato i link di React Router così la navigazione è super veloce
 * senza dover ricaricare la pagina innumerevoli volte.
 */

import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    <span className="header__logo-icon">🚀</span>
                    <span className="header__logo-text">NASA Explorer</span>
                </Link>

                {/* Menu di navigazione principale */}
                <nav className="header__nav">
                    <Link to="/" className="header__nav-link">
                        APOD
                    </Link>
                    <Link to="/neos" className="header__nav-link">
                        NEO
                    </Link>
                </nav>
            </div>
        </header>
    );
};
