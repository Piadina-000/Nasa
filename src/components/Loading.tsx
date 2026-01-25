import './Loading.css';

/**
 * Componente Loading, indicatore di caricamento
 * Visualizza uno spinner durante il caricamento dei dati
 */
export const Loading: React.FC = () => {
    return (
        <div className="loading">
            <div className="loading__spinner">
                <div className="loading__spinner-inner"></div>
            </div>
            <p className="loading__text">Caricamento...</p>
        </div>
    );
};
