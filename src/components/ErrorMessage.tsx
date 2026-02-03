/**
 * COMPONENTE ERROR MESSAGE - Gestione errori
 * 
 * Visualizza messaggi di errore in modo molto esplicito.
 * Mostra:
 * - Un'icona di warning
 * - Il messaggio di errore
 * - Il codice di stato HTTP (se è disponibile)
 * - Un pulsante "Riprova" per ritentare l'operazione
 * 
 * Viene usato quando le chiamate API falliscono o ci sono problemi di rete.
 */

import type { ErrorComponentProps } from '../types';
import './ErrorMessage.css';

export const ErrorMessage: React.FC<ErrorComponentProps> = ({ error, onRetry }) => {
    // Se non c'è errore, non mostra nulla
    if (!error) return null;

    return (
        <div className="error-message">
            <div className="error-message__container">
                {/* Icona di warning */}
                <div className="error-message__icon">⚠️</div>
                
                {/* Contenuto dell'errore */}
                <div className="error-message__content">
                    <h2 className="error-message__title">Errore nel caricamento</h2>
                    <p className="error-message__message">{error.message}</p>
                    
                    {/* Mostra il codice solo se è presente */}
                    {error.status && (
                        <p className="error-message__status">
                            Codice errore: {error.status}
                        </p>
                    )}
                </div>
                
                {/* Pulsante riprova (solo se la funzione onRetry è stata passata) */}
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
