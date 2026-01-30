import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { NeoObject, ApiError } from '../types';
import { Header, Loading, ErrorMessage } from '../components';
import '../style/NeoDetail.css';

// Configurazione API NASA
const NASA_API = 'https://api.nasa.gov';
const API_KEY = '9ndqamVaOsIlkGRpXYRAZH8QehrjctGv56cfNLbq';

// Cache semplice
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; 

/**
 * Pagina dettaglio NEO
 * Visualizza informazioni complete su un NEO
 */
export const NeoDetailPage: React.FC = () => {
    const { neoId } = useParams<{ neoId: string }>();
    const navigate = useNavigate();

    // Funzione per chiamare l'API NEO
    const fetchTodayNeos = async (): Promise<NeoObject[]> => {
        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `neo-${today}`;
        const cached = cache.get(cacheKey);

        // Controlla cache
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }

        try {
            const url = `${NASA_API}/neo/rest/v1/feed?api_key=${API_KEY}&start_date=${today}&end_date=${today}`;
            const response = await fetch(url, {
                signal: AbortSignal.timeout(30000),
            });

            if (response.status === 429) {
                throw {
                    message: '⚠️ Troppe richieste! Riprova tra qualche secondo.',
                    status: 429,
                    code: 'RATE_LIMIT',
                } as ApiError;
            }

            if (!response.ok) {
                throw {
                    message: 'Errore nel caricamento NEO',
                    status: response.status,
                    code: 'API_ERROR',
                } as ApiError;
            }

            const data = await response.json();
            const neos = data.near_earth_objects[today] || [];
            
            // Salva in cache
            cache.set(cacheKey, { data: neos, timestamp: Date.now() });
            return neos;
        } catch (error: any) {
            if (error.name === 'TimeoutError') {
                throw {
                    message: 'Timeout: richiesta troppo lenta',
                    status: 408,
                    code: 'TIMEOUT',
                } as ApiError;
            }
            throw error.status ? error : {
                message: error.message || 'Errore nel caricamento NEO',
                status: 500,
                code: 'API_ERROR',
            } as ApiError;
        }
    };

    const { data: neos, isLoading, isError, error } = useQuery({
        queryKey: ['today-neos'],
        queryFn: fetchTodayNeos,
        staleTime: 1000 * 60 * 60,
        retry: (failureCount, error: any) => {
            if (error?.status === 429) return false;
            return failureCount < 3;
        },
    });

    // Trova il NEO corrispondente all'ID
    const neo = neos?.find(n => n.id === neoId);

    const handleGoBack = () => {
        navigate('/neos');
    };

    return (
        <>
            <Header />
            <div className="neo-detail">
                <div className="neo-detail__header">
                    <button className="neo-detail__back-button" onClick={handleGoBack}>
                        ← Torna a NEO
                    </button>
                </div>

                {isLoading && <Loading />}

                {isError && error && (
                    <ErrorMessage
                        error={error}
                    />
                )}

                {neo ? (
                    <div className="neo-detail__container">
                        <div className="neo-detail__card">
                            <div className="neo-detail__title-section">
                                <h1 className="neo-detail__title">{neo.name}</h1>
                                <div className="neo-detail__badges">
                                    {neo.is_potentially_hazardous_asteroid && (
                                        <span className="neo-detail__badge neo-detail__badge--hazardous">
                                            ⚠️ POTENZIALMENTE PERICOLOSO
                                        </span>
                                    )}
                                    <span className="neo-detail__badge">
                                        ID: {neo.neo_reference_id}
                                    </span>
                                </div>
                            </div>

                            <div className="neo-detail__section">
                                <h2 className="neo-detail__section-title">📏 Dimensioni</h2>
                                <div className="neo-detail__grid">
                                    <div className="neo-detail__stat">
                                        <span className="neo-detail__stat-label">Diametro (km)</span>
                                        <span className="neo-detail__stat-value">
                                            {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)}
                                        </span>
                                    </div>
                                    <div className="neo-detail__stat">
                                        <span className="neo-detail__stat-label">Diametro (m)</span>
                                        <span className="neo-detail__stat-value">
                                            {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(0)} - {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {neo.close_approach_data && neo.close_approach_data.length > 0 && (
                                <div className="neo-detail__section">
                                    <h2 className="neo-detail__section-title">🌍 Approcci Più Vicini</h2>
                                    <div className="neo-detail__approaches">
                                        {neo.close_approach_data.slice(0, 3).map((approach, index) => (
                                            <div key={index} className="neo-detail__approach-card">
                                                <div className="neo-detail__approach-header">
                                                    <h3 className="neo-detail__approach-title">
                                                        {new Date(approach.close_approach_date).toLocaleDateString('it-IT', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </h3>
                                                </div>

                                                <div className="neo-detail__approach-grid">
                                                    <div className="neo-detail__approach-stat">
                                                        <span className="neo-detail__approach-label">Distanza (km)</span>
                                                        <span className="neo-detail__approach-value">
                                                            {parseInt(approach.miss_distance.kilometers).toLocaleString('it-IT')}
                                                        </span>
                                                    </div>
                                                    <div className="neo-detail__approach-stat">
                                                        <span className="neo-detail__approach-label">Velocità (km/s)</span>
                                                        <span className="neo-detail__approach-value">
                                                            {parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {neo.close_approach_data.length > 3 && (
                                        <p className="neo-detail__info">
                                            +{neo.close_approach_data.length - 3} ulteriori approcci disponibili
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="neo-detail__section">
                                <h2 className="neo-detail__section-title">ℹ️ Informazioni</h2>
                                <div className="neo-detail__info-grid">
                                    <div className="neo-detail__info-item">
                                        <span className="neo-detail__info-label">ID Riferimento NASA</span>
                                        <code className="neo-detail__info-value">{neo.neo_reference_id}</code>
                                    </div>
                                    <div className="neo-detail__info-item">
                                        <span className="neo-detail__info-label">ID</span>
                                        <code className="neo-detail__info-value">{neo.id}</code>
                                    </div>
                                    <div className="neo-detail__info-item">
                                        <span className="neo-detail__info-label">Status</span>
                                        <span className="neo-detail__info-value">
                                            {neo.is_potentially_hazardous_asteroid ? '⚠️ Pericoloso' : '✅ Sicuro'}
                                        </span>
                                    </div>
                                    <div className="neo-detail__info-item">
                                        <span className="neo-detail__info-label">Approcci Documentati</span>
                                        <span className="neo-detail__info-value">
                                            {neo.close_approach_data.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    !isLoading && (
                        <div className="neo-detail__not-found">
                            <p>NEO non trovato</p>
                            <button className="neo-detail__back-button" onClick={handleGoBack}>
                                Torna alla lista
                            </button>
                        </div>
                    )
                )}
            </div>
        </>
    );
};
