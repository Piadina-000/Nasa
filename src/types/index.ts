// TIPI E INTERFACCE - NASA API TYPES

/** Type alias per ID entità */
export type EntityId = string | number;

/** Type alias per tipo di media */
export type MediaType = 'image' | 'video';

/** Type alias per pagina in lista */
export type PageInfo = {
    current: number;
    total: number;
    hasMore: boolean;
};


// INTERFACCE - APOD (Astronomy Picture of the Day)

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

/** Type alias per risposta APOD */
export type ApodResponse = ApodImage;


// INTERFACCE - NEO (Near Earth Objects)


/** Diameter object per NEO */
export interface DiameterEstimate {
    kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
    meters: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
}

/** Close approach data */
export interface CloseApproachData {
    close_approach_date: string;
    close_approach_date_full: string;
    relative_velocity: {
        kilometers_per_second: string;
    };
    miss_distance: {
        kilometers: string;
    };
}

/**
 * NEO (Near Earth Object)
 */
export interface NeoObject {
    id: string;
    neo_reference_id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: DiameterEstimate;
    close_approach_data: CloseApproachData[];
}

/** Type alias per status di pericolosità */
export type HazardStatus = 'hazardous' | 'safe';

/** Utility type per NEO con status derivato */
export type NeoWithStatus = NeoObject & {
    hazardStatus: HazardStatus;
};

/** Type alias per risposta lista NEO */
export type NeoListResponse = NeoObject[];


// INTERFACCE - ERROR HANDLING


/**
 * Errore API standardizzato
 */
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

/** Union type per risultato operazione */
export type ApiResult<T> = 
    | { success: true; data: T }
    | { success: false; error: ApiError };


// GENERICS E INTERFACE GENERICHE


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


// INTERSECTION TYPES


/** Tipo per entità NASA con metadata */
export type NasaEntity = {
    id: EntityId;
    created_at?: string;
    updated_at?: string;
};

/** Tipo per APOD con metadata */
export type NasaApod = ApodImage & NasaEntity;


// TIPI PER SELEZIONE UI


/** Filtri per NEO */
export type NeoFilters = {
    onlyHazardous?: boolean;
    minDiameter?: number;
    maxDiameter?: number;
};

/** Stato di una pagina */
export type PageState = 'loading' | 'success' | 'error' | 'idle';


// PROPS TYPES PER COMPONENTI


/**
 * Props generiche per componenti di errore
 * @template E - Tipo dell'errore
 */
export interface ErrorComponentProps<E = ApiError> {
    error: E | null;
    onRetry?: () => void;
}

/**
 * Props generiche per componenti di lista
 * @template T - Tipo degli elementi nella lista
 */
export interface ListComponentProps<T> {
    items: T[];
    isLoading: boolean;
    error: ApiError | null;
    onItemSelect?: (item: T) => void;
}
