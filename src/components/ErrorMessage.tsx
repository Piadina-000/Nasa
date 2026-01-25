import type { ErrorComponentProps } from '../types';
import './ErrorMessage.css';

/**
 * Componente ErrorMessage, visualizzazione errori
 * Mostra un messaggio di errore, possibilità di riprova
 * @template E Tipo dell'errore
 */
export const ErrorMessage: React.FC<ErrorComponentProps> = ({ error, onRetry }) => {
    if (!error) return null;

    return (
        <div className="error-message">
            <div className="error-message__container">
                <div className="error-message__icon">⚠️</div>
                <div className="error-message__content">
                    <h2 className="error-message__title">Errore nel caricamento</h2>
                    <p className="error-message__message">{error.message}</p>
                    {error.status && (
                        <p className="error-message__status">
                            Codice errore: {error.status}
                        </p>
                    )}
                </div>
                {onRetry && (
                    <button 
                        className="error-message__button"
                        onClick={onRetry}
                        aria-label="Riprova a caricare i dati"
                    >
                        Riprova
                    </button>
                )}
            </div>
        </div>
    );
};
