/**
 * TIPI COMPONENT
 */

import type { ApiError } from './error.types';

/**
 * Props generiche per componenti della lista
 * @template T - Tipo degli elementi nella lista
 */
export interface ListComponentProps<T> {
    items: T[];
    isLoading: boolean;
    error: ApiError | null;
    onItemSelect?: (item: T) => void;
}
