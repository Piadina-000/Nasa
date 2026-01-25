export type EntityId = string | number;
export type MediaType = 'image' | 'video';

// Interfaccia APOD
export interface ApodImage {
    date: string;
    title: string;
    explanation: string;
    url: string;
    hdurl?: string;
    media_type: MediaType;
    copyright?: string;
}

// Interfaccia NEO base
export interface NeoObject {
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
}

// Error handling
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

export interface ErrorComponentProps<E = ApiError> {
    error: E | null;
    onRetry?: () => void;
}