/**
 * TIPI ERROR HANDLING - Gestione errori API
 */

/**
 * Errore API standardizzato
 */
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

export type ApiResult<T> = 
    | { success: true; data: T }
    | { success: false; error: ApiError };

/**
 * Props generiche per componenti di errore
 * @template E - Tipo dell'errore
 */
export interface ErrorComponentProps<E = ApiError> {
    error: E | null;
    onRetry?: () => void;
}
