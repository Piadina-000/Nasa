/**
 * TIPI FEEDBACK E FORM
 * 
 * Definizioni per il sistema di raccolta feedback utente.
 * Permette di tipizzare correttamente richieste e risposte.
 * 
 * @author Carmen - UF07WEB
 */

/**
 * Tipo di feedback che l'utente può inviare
 * 
 * - bug: Segnalazione di un problema/errore
 * - feature: Richiesta di nuova funzionalità
 * - general: Feedback generico
 * - other: Altro tipo di comunicazione
 */
export type FeedbackType = 'bug' | 'feature' | 'general' | 'other';

/**
 * Dati inviati quando l'utente invia il feedback
 * 
 * Questo è l'oggetto che viene serializzato e mandato all'API.
 */
export interface FeedbackRequest {
    /** Tipo di feedback */
    type: FeedbackType;
    
    /** Titolo breve del feedback */
    title: string;
    
    /** Messaggio dettagliato */
    message: string;
    
    /** Email dell'utente (opzionale) */
    userEmail?: string;
    
    /** Timestamp di quando è stato creato */
    timestamp: string;
}

/**
 * Risposta dal server dopo l'invio del feedback
 * 
 * Conferma che il feedback è stato ricevuto con successo.
 */
export interface FeedbackResponse {
    /** Se l'operazione è andata a buon fine */
    success: boolean;
    
    /** ID univoco assegnato al feedback */
    id: string;
    
    /** Messaggio di conferma da mostrare all'utente */
    message: string;
    
    /** Quando è stato processato */
    timestamp: string;
}

import type { ApiResult } from './error.types';

export type FeedbackResult = ApiResult<FeedbackResponse>;
