import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApodImage, ApiError } from '../types';
import { Header, Loading, ErrorMessage } from '../components';
import '../style/ApodPage.css';

// Configurazione API NASA
const NASA_API = 'https://api.nasa.gov';
const API_KEY = '9ndqamVaOsIlkGRpXYRAZH8QehrjctGv56cfNLbq';

// Cache per ridurre le richieste
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; 

export const ApodPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    // Funzione per chiamare l'API APOD
    const fetchApod = async (date: string): Promise<ApodImage> => {
        const cacheKey = `apod-${date}`;
        const cached = cache.get(cacheKey);
        
        // Controllo della cache
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }

        try {
            const url = `${NASA_API}/planetary/apod?api_key=${API_KEY}&date=${date}`;
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
                    message: `Errore nel caricamento APOD`,
                    status: response.status,
                    code: 'API_ERROR',
                } as ApiError;
            }

            const data = await response.json();

            // Salva in cache
            cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error: any) {
            if (error.name === 'TimeoutError') {
                throw {
                    message: 'Timeout: richiesta troppo lenta',
                    status: 408,
                    code: 'TIMEOUT',
                } as ApiError;
            }
            throw error.status ? error : {
                message: error.message || 'Errore nel caricamento APOD',
                status: 500,
                code: 'API_ERROR',
            } as ApiError;
        }
    };

    const { data: apod, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['apod', selectedDate],
        queryFn: () => fetchApod(selectedDate),
        staleTime: 1000 * 60 * 60,
        retry: (failureCount, error: any) => {
            if (error?.status === 429) return false;
            return failureCount < 3;
        },
    });

    const handlePreviousDay = () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - 1);
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    const handleNextDay = () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 1);
        // Non andare oltre la giornata di oggi
        if (date <= new Date()) {
            setSelectedDate(date.toISOString().split('T')[0]);
        }
    };

    const handleToday = () => {
        setSelectedDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <>
            <Header />
            <div className="apod-page">
                <h1 className="apod-page__title"><span className="apod-page__title-text">Astronomy Picture of the Day</span></h1>

                {isLoading && <Loading />}

                {isError && error && (
                    <ErrorMessage
                        error={error}
                        onRetry={() => refetch()}
                    />
                )}

                {apod && (
                    <>
                        <div className="apod-page__controls">
                            <button onClick={handlePreviousDay} className="apod-page__button">
                                ← Giorno precedente
                            </button>
                            <button onClick={handleToday} className="apod-page__button apod-page__button--today">
                                📅 Oggi
                            </button>
                            <button
                                onClick={handleNextDay}
                                className="apod-page__button"
                                disabled={selectedDate >= new Date().toISOString().split('T')[0]}
                            >
                                Giorno successivo →
                            </button>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="apod-page__date-input"
                            />
                        </div>

                        <div className="apod-page__content">
                            <div className="apod-page__media">
                                {apod.media_type === 'image' ? (
                                    <img src={apod.url} alt={apod.title} className="apod-page__image" />
                                ) : (
                                    <iframe
                                        src={apod.url}
                                        title={apod.title}
                                        className="apod-page__video"
                                        allowFullScreen
                                    />
                                )}
                            </div>

                            <div className="apod-page__info">
                                <h2 className="apod-page__image-title">{apod.title}</h2>

                                <div className="apod-page__metadata">
                                    <p className="apod-page__date">
                                        📅 {new Date(apod.date).toLocaleDateString('it-IT', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    </p>
                                    {apod.copyright && (
                                        <p className="apod-page__copyright">© {apod.copyright}</p>
                                    )}
                                </div>

                                <div className="apod-page__description">
                                    <h3 className="apod-page__description-title">📖 Spiegazione</h3>
                                    <p>{apod.explanation}</p>
                                </div>

                                {apod.hdurl && (
                                    <a
                                        href={apod.hdurl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="apod-page__download"
                                    >
                                        📥 Scarica immagine in HD
                                    </a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
