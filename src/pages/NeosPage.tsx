import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { NeoObject, ApiError } from '../types';
import { Header, Loading, ErrorMessage } from '../components';
import '../style/NeosPage.css';

// Configurazione API NASA
const NASA_API = 'https://api.nasa.gov';
const API_KEY = '9ndqamVaOsIlkGRpXYRAZH8QehrjctGv56cfNLbq';

// Cache semplice
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; 

export const NeosPage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'hazardous' | 'safe'>('all');

    // Funzione per chiamare l'API NEO
    const fetchTodayNeos = async (): Promise<NeoObject[]> => {
        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `neo-${today}`;
        const cached = cache.get(cacheKey);

        // Controlla la cache
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

    const { data: neos, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['today-neos'],
        queryFn: fetchTodayNeos,
        staleTime: 1000 * 60 * 60,
        retry: (failureCount, error: any) => {
            if (error?.status === 429) return false;
            return failureCount < 3;
        },
    });

    const hazardousNeos = neos?.filter((neo) => neo.is_potentially_hazardous_asteroid) || [];
    const safeNeos = neos?.filter((neo) => !neo.is_potentially_hazardous_asteroid) || [];

    return (
        <>
            <Header />
            <div className="neos-page">
                <h1 className="neos-page__title"><span className="neos-page__title-text">Near Earth Objects - Today</span></h1>

                {isLoading && <Loading />}

                {isError && error && (
                    <ErrorMessage
                        error={error}
                        onRetry={() => refetch()}
                    />
                )}

                {neos && neos.length > 0 && (
                    <>
                        <div className="neos-page__stats">
                            <button 
                                onClick={() => setFilter('all')}
                                className={`neos-page__stat-card neos-page__stat-card--total ${filter === 'all' ? 'neos-page__stat-card--active' : ''}`}
                            >
                                <span className="neos-page__stat-label">Total NEOs</span>
                                <span className="neos-page__stat-value">{neos.length}</span>
                            </button>
                            <button 
                                onClick={() => setFilter('hazardous')}
                                className={`neos-page__stat-card neos-page__stat-card--hazardous ${filter === 'hazardous' ? 'neos-page__stat-card--active' : ''}`}
                            >
                                <span className="neos-page__stat-label">⚠️ Hazardous</span>
                                <span className="neos-page__stat-value">{hazardousNeos.length}</span>
                            </button>
                            <button 
                                onClick={() => setFilter('safe')}
                                className={`neos-page__stat-card neos-page__stat-card--safe ${filter === 'safe' ? 'neos-page__stat-card--active' : ''}`}
                            >
                                <span className="neos-page__stat-label">✅ Safe</span>
                                <span className="neos-page__stat-value">{safeNeos.length}</span>
                            </button>
                        </div>

                        {(filter === 'all' || filter === 'hazardous') && hazardousNeos.length > 0 && (
                            <div className="neos-page__section">
                                <h2 className="neos-page__section-title neos-page__section-title--hazardous">
                                    <span className="neos-page__section-icon">⚠️</span>
                                    Potentially Hazardous Asteroids
                                </h2>
                                <div className="neos-page__grid">
                                    {hazardousNeos.map((neo) => (
                                        <div key={neo.id} className="neos-page__neo-card neos-page__neo-card--hazardous">
                                            <div className="neos-page__neo-header">
                                                <h3 className="neos-page__neo-name">{neo.name}</h3>
                                                <span className="neos-page__neo-badge neos-page__neo-badge--hazardous">
                          ⚠️ HAZARDOUS
                        </span>
                                            </div>

                                            <div className="neos-page__neo-data">
                                                <div className="neos-page__data-row">
                                                    <span className="neos-page__data-label">Diameter:</span>
                                                    <span className="neos-page__data-value">
                            {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                          </span>
                                                </div>

                                                {neo.close_approach_data && neo.close_approach_data.length > 0 && (
                                                    <>
                                                        <div className="neos-page__data-row">
                                                            <span className="neos-page__data-label">Close Approach:</span>
                                                            <span className="neos-page__data-value">
                                {new Date(neo.close_approach_data[0].close_approach_date).toLocaleDateString('it-IT')}
                              </span>
                                                        </div>

                                                        <div className="neos-page__data-row">
                                                            <span className="neos-page__data-label">Distance:</span>
                                                            <span className="neos-page__data-value">
                                {parseInt(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
                              </span>
                                                        </div>

                                                        <div className="neos-page__data-row">
                                                            <span className="neos-page__data-label">Velocity:</span>
                                                            <span className="neos-page__data-value">
                                {parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2)} km/s
                              </span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(filter === 'all' || filter === 'safe') && safeNeos.length > 0 && (
                            <div className="neos-page__section">
                                <h2 className="neos-page__section-title neos-page__section-title--safe">
                                    <span className="neos-page__section-icon">✅</span>
                                    Safe Near Earth Objects
                                </h2>
                                <div className="neos-page__grid">
                                    {safeNeos.map((neo) => (
                                        <div key={neo.id} className="neos-page__neo-card">
                                            <div className="neos-page__neo-header">
                                                <h3 className="neos-page__neo-name">{neo.name}</h3>
                                                <span className="neos-page__neo-badge neos-page__neo-badge--safe"> ✅ SAFE </span>
                                            </div>

                                            <div className="neos-page__neo-data">
                                                <div className="neos-page__data-row">
                                                    <span className="neos-page__data-label">Diameter:</span>
                                                    <span className="neos-page__data-value">
                                                        {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                                                    </span>
                                                </div>

                                                {neo.close_approach_data && neo.close_approach_data.length > 0 && (
                                                    <>
                                                        <div className="neos-page__data-row">
                                                            <span className="neos-page__data-label">Close Approach:</span>
                                                            <span className="neos-page__data-value">
                                                                {new Date(neo.close_approach_data[0].close_approach_date).toLocaleDateString('it-IT')}
                                                            </span>
                                                        </div>

                                                        <div className="neos-page__data-row">
                                                            <span className="neos-page__data-label">Distance:</span>
                                                            <span className="neos-page__data-value">
                                                                {parseInt(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {neos && neos.length === 0 && !isLoading && !isError && (
                    <div className="neos-page__empty">
                        <p>📭 Nessun asteroide rilevato oggi nelle vicinanze della Terra</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.7 }}>
                            Riprova domani per nuovi dati!
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};
