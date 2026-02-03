/**
 * PAGINA APOD - Astronomy Picture of the Day
 * 
 * Pagina principale dell'app! Mostra l'immagine astronomica
 * del giorno scelta dalla NASA. È una delle API più belle che ho trovato, anche perchè adoro l'astronomia :)
 * 
 * FUNZIONALITÀ IMPLEMENTATE:
 * - Caricamento dell'immagine del giorno corrente
 * - Navigazione tra le date
 * - Sistema di cache per evitare troppe chiamate API
 * - Gestione errori (rate limit, timeout, errori generici)
 * - Visualizzazione immagini e video 
 * - Modale per vedere l'immagine a schermo intero
 * 
 * DETTAGLI TECNICI:
 * - Uso React Query per gestire stato e cache delle API
 * - Cache manuale aggiuntiva di 1 ora per risparmiare le chiamate
 * - Timeout di 30 secondi per le richieste
 * - Retry automatico max 3 volte (tranne per il rate limit)
 * 
 * @author Carmen - UF07WEB
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApodImage, ApiError } from '../types';
import { Header, Loading, ErrorMessage } from '../components';
import '../style/ApodPage.css';

// Configurazione API NASA
const NASA_API = 'https://api.nasa.gov';
const API_KEY = '9ndqamVaOsIlkGRpXYRAZH8QehrjctGv56cfNLbq'; // Chiave demo NASA

// Sistema di cache manuale per ridurre le chiamate API
// La NASA ha un rate limit, quindi meglio cachare i risultati
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 ora in millisecondi

export const ApodPage: React.FC = () => {
    // Stato per la data selezionata (default: oggi)
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    /**
     * Funzione che recupera i dati APOD dall'API NASA
     * 
     * @param date - Data in formato YYYY-MM-DD
     * @returns Promise con i dati APOD
     */
    const fetchApod = async (date: string): Promise<ApodImage> => {
        const cacheKey = `apod-${date}`;
        const cached = cache.get(cacheKey);
        
        // Controllo cache: se i dati sono recenti li uso direttamente
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }

        try {
            const url = `${NASA_API}/planetary/apod?api_key=${API_KEY}&date=${date}`;
            const response = await fetch(url, {
                signal: AbortSignal.timeout(30000), // Timeout 30 secondi
            });

            // Gestione rate limit
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

            // Salva in cache per richieste future
            cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error: any) {
            // Gestione timeout
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

    // Hook React Query per gestire il fetch e lo stato
    const { data: apod, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['apod', selectedDate], // Chiave unica per data
        queryFn: () => fetchApod(selectedDate),
        staleTime: 1000 * 60 * 60, // I dati sono recenti per 1 ora
        retry: (failureCount, error: any) => {
            // Non ritentare se è rate limit, altrimenti max 3 tentativi
            if (error?.status === 429) return false;
            return failureCount < 3;
        },
    });

    /**
     * Funzioni per la navigazione tra le date
     */
    const handlePreviousDay = () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - 1);
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    const handleNextDay = () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 1);
        // Impedisce di andare oltre oggi (un APOD futuro non può esiste)
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

                {/* Mostra spinner durante il caricamento */}
                {isLoading && <Loading />}

                {/* Mostra errori se presenti */}
                {isError && error && (
                    <ErrorMessage
                        error={error}
                        onRetry={() => refetch()}
                    />
                )}

                {/* Contenuto principale quando i dati sono caricati */}
                {apod && (
                    <>
                        {/* Controlli di navigazione */}
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
