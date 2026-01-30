/**
 * TIPI APOD
 */

import type { MediaType, NasaEntity } from './common.types';

/**
 * Immagine APOD (Astronomy Picture of the Day)
 */
export interface ApodImage {
    date: string;
    title: string;
    explanation: string;
    url: string;
    hdurl?: string;
    media_type: MediaType;
    copyright?: string;
}

export type ApodResponse = ApodImage;

export type NasaApod = ApodImage & NasaEntity;
