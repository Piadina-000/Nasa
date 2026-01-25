import { Link } from 'react-router-dom';
import './Header.css';

/**
 * Componente Header, barra di navigazione principale
 * Fornisce la navigazione tra le principali sezioni dell'app
 */
export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    <span className="header__logo-icon">🚀</span>
                    <span className="header__logo-text">NASA Explorer</span>
                </Link>

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
