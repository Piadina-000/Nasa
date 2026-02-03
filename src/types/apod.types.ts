/**
 * TIPI APOD - Astronomy Picture of the Day
 * 
 * Definizioni TypeScript per i dati dell'API APOD della NASA.
 * L'API restituisce un'immagine o video astronomico al giorno con spiegazione.
 * 
 * @see https://api.nasa.gov/#apod
 * @author Carmen - UF07WEB
 */

import type { MediaType, NasaEntity } from './common.types';

/**
 * Interfaccia principale per l'immagine APOD
 * 
 * Rappresenta i dati restituiti dall'API NASA APOD.
 * Ogni giorno la NASA pubblica una nuova immagine/video astronomico.
 */
export interface ApodImage {
    /** Data dell'APOD in formato YYYY-MM-DD */
    date: string;
    
    /** Titolo dell'immagine/video */
    title: string;
    
    /** Spiegazione scientifica dettagliata */
    explanation: string;
    
    /** URL dell'immagine/video (versione standard) */
    url: string;
    
    /** URL ad alta risoluzione (opzionale, solo per immagini) */
    hdurl?: string;
    
    /** Tipo di media: 'image' o 'video' */
    media_type: MediaType;
    
    /** Copyright dell'immagine (se non è pubblico dominio) */
    copyright?: string;
}

export type ApodResponse = ApodImage;

export type NasaApod = ApodImage & NasaEntity;
