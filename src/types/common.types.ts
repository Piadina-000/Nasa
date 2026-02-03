/**
 * TIPI COMUNI
 * 
 * Definizioni TypeScript riutilizzabili in tutta l'app.
 * Questi tipi aiutano a mantenere consistenza nel codice.
 * 
 * @author Carmen - UF07WEB
 */

/**
 * ID generico per entità (può essere stringa o numero)
 * Utile perché alcune API usano stringhe, altre numeri
 */
export type EntityId = string | number;

/**
 * Tipo di media supportati dall'app
 * - image: Immagini (JPG, PNG, ecc.)
 * - video: Video embedded (tipo youtube)
 */
export type MediaType = 'image' | 'video';

/**
 * Informazioni sulla paginazione
 * Utile per liste lunghe divise in pagine
 */
export type PageInfo = {
    /** Pagina corrente */
    current: number;
    
    /** Numero totale di pagine */
    total: number;
    
    /** Se ci sono altre pagine da caricare */
    hasMore: boolean;
};

/** Stato di una pagina */
export type PageState = 'loading' | 'success' | 'error' | 'idle';

/** Tipo per entità NASA con metadata */
export type NasaEntity = {
    id: EntityId;
    created_at?: string;
    updated_at?: string;
};

/**
 * Risposta generica API con dati generici
 * @template T - Tipo dei dati nella risposta
 */
export interface ApiResponse<T> {
    data: T;
    status: number;
    timestamp?: string;
}

/**
 * Lista paginata generica
 * @template T - Tipo degli elementi nella lista
 */
export interface PaginatedList<T> {
    items: T[];
    page: PageInfo;
    total: number;
}

/**
 * Wrapper per dati con stato di caricamento
 * @template T - Tipo dei dati
 */
export interface AsyncData<T> {
    isLoading: boolean;
    isError: boolean;
    error: ApiError | null;
    data: T | null;
}

/**
 * Cache generica con TTL
 * @template T - Tipo dei dati in cache
 */
export interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

// Importa ApiError
import type { ApiError } from './error.types';
