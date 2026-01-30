/**
 * TIPI FEEDBACK E FORM
 */

/** Tipo di feedback */
export type FeedbackType = 'bug' | 'feature' | 'general' | 'other';

/**
 * Richiesta di feedback (per il POST)
 */
export interface FeedbackRequest {
    type: FeedbackType;
    title: string;
    message: string;
    userEmail?: string;
    timestamp: string;
}

/**
 * Risposta dal server per il feedback
 */
export interface FeedbackResponse {
    success: boolean;
    id: string;
    message: string;
    timestamp: string;
}

import type { ApiResult } from './error.types';

export type FeedbackResult = ApiResult<FeedbackResponse>;
