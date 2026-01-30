import { Link } from 'react-router-dom';
import { Header } from '../components';
import '../style/NotFound.css';
import gattoImg from '../img/gatto.png';

/**
 * Pagina 404 - Not Found
 * Visualizzata quando l'utente accede a una rotta non valida
 */
export const NotFound: React.FC = () => {
    return (
        <>
            <Header />
            <div className="not-found">
                <div className="not-found__container">
                    <div className="not-found__code">404</div>
                    <h1 className="not-found__title">Pagina Non Trovata</h1>
                    <p className="not-found__description">
                        Cavoletti di bruxelles! La pagina che stai cercando non esiste o è stata spostata.
                    </p>

                    <p className="not-found__description">
                        Ecco l'immagine di un gatto con una foglia in mano per migliorarti la giornata.
                    </p>
                    <div>
                        <img src={gattoImg} alt="Gatto" />
                    </div>
                    <div className="not-found__icon">🔭</div>
                    <Link to="/" className="not-found__button">
                        Torna alla Home
                    </Link>
                </div>
            </div>
        </>
    );
};
