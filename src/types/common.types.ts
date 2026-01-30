/**
 * TIPI COMUNI
 */


export type EntityId = string | number;


export type MediaType = 'image' | 'video';

/** Type alias per pagina in lista */
export type PageInfo = {
    current: number;
    total: number;
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
