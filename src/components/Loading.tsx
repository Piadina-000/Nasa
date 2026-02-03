/**
 * COMPONENTE LOADING - Spinner di caricamento
 * 
 * Un semplice componente che mostra uno spinner animato mentre
 * i dati vengono caricati dalle API della NASA.
 * 
 * Viene usato in tutte le pagine durante il fetch dei dati.
 */

import './Loading.css';

export const Loading: React.FC = () => {
    return (
        <div className="loading">
            {/* Spinner animato tramite CSS */}
            <div className="loading__spinner">
                <div className="loading__spinner-inner"></div>
            </div>
            <p className="loading__text">Caricamento...</p>
        </div>
    );
};
