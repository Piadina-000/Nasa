import { useState } from 'react';
import type { FeedbackType, FeedbackRequest, FeedbackResponse, ApiError } from '../types';
import './Feedback.css';

/**
 * Componente Feedback - Form di feedback per gli utenti
 * Permette agli utenti di segnalare bug, richiedere feature o inviare feedback generico
 */
export const Feedback: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<FeedbackType>('general');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    /**
     * Invia il feedback usando la fetch
     */
    const sendFeedback = async (feedback: FeedbackRequest): Promise<FeedbackResponse> => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: feedback.title,
                    body: feedback.message,
                    userId: 999,
                }),
                signal: AbortSignal.timeout(10000),
            });

            if (!response.ok) {
                throw {
                    message: 'Errore nell\'invio del feedback',
                    status: response.status,
                    code: 'API_ERROR',
                } as ApiError;
            }

            const data = await response.json();

            return {
                success: true,
                id: String(data.id),
                message: `Grazie! Il tuo feedback "${feedback.title}" è stato ricevuto con successo!`,
                timestamp: new Date().toISOString(),
            };
        } catch (error: any) {
            if (error.name === 'TimeoutError') {
                throw {
                    message: 'Timeout: richiesta troppo lenta',
                    status: 408,
                    code: 'TIMEOUT',
                } as ApiError;
            }
            throw error.status ? error : {
                message: error.message || 'Errore nell\'invio del feedback',
                status: 500,
                code: 'API_ERROR',
            } as ApiError;
        }
    };

    /**
     * Gestisce l'invio del form del feedback
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitMessage(null);

        try {
            const response = await sendFeedback({
                type,
                title,
                message,
                userEmail: userEmail || undefined,
                timestamp: new Date().toISOString(),
            });

            setSubmitMessage({
                type: 'success',
                text: response.message,
            });

            // Reset form
            setTitle('');
            setMessage('');
            setUserEmail('');
            setType('general');

            // Chiudi il modal dopo 3 secondi
            setTimeout(() => {
                setIsOpen(false);
                setSubmitMessage(null);
            }, 3000);
        } catch (error) {
            const err = error as any;
            setSubmitMessage({
                type: 'error',
                text: err?.message || 'Errore nell\'invio del feedback',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Pulsante floating */}
            <button
                className="feedback__button"
                onClick={() => setIsOpen(!isOpen)}
                title="Invia feedback"
                aria-label="Invia feedback"
            >
                💬
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="feedback__overlay" onClick={() => setIsOpen(false)}>
                    <div className="feedback__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="feedback__header">
                            <h2 className="feedback__title">Invia il tuo Feedback</h2>
                            <button
                                className="feedback__close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Chiudi"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="feedback__form">
                            {submitMessage && (
                                <div className={`feedback__message feedback__message--${submitMessage.type}`}>
                                    {submitMessage.text}
                                </div>
                            )}

                            <div className="feedback__group">
                                <label htmlFor="feedback-type" className="feedback__label">
                                    Tipo di Feedback *
                                </label>
                                <select
                                    id="feedback-type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as FeedbackType)}
                                    className="feedback__select"
                                    required
                                >
                                    <option value="general">Feedback Generale</option>
                                    <option value="bug">Segnala un Bug</option>
                                    <option value="feature">Richiedi una Feature</option>
                                    <option value="other">Altro</option>
                                </select>
                            </div>

                            <div className="feedback__group">
                                <label htmlFor="feedback-title" className="feedback__label">
                                    Titolo * (3-100 caratteri)
                                </label>
                                <input
                                    id="feedback-title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Scrivi un titolo breve..."
                                    className="feedback__input"
                                    required
                                    minLength={3}
                                    maxLength={100}
                                />
                                <span className="feedback__char-count">
                                    {title.length}/100
                                </span>
                            </div>

                            <div className="feedback__group">
                                <label htmlFor="feedback-message" className="feedback__label">
                                    Messaggio * (10-5000 caratteri)
                                </label>
                                <textarea
                                    id="feedback-message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Descrivi dettagliatamente il tuo feedback..."
                                    className="feedback__textarea"
                                    required
                                    minLength={10}
                                    maxLength={5000}
                                    rows={5}
                                />
                                <span className="feedback__char-count">
                                    {message.length}/5000
                                </span>
                            </div>

                            <div className="feedback__group">
                                <label htmlFor="feedback-email" className="feedback__label">
                                    Email (opzionale)
                                </label>
                                <input
                                    id="feedback-email"
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="tua.email@example.com"
                                    className="feedback__input"
                                />
                            </div>

                            <div className="feedback__actions">
                                <button
                                    type="button"
                                    className="feedback__button-cancel"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isLoading}
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="feedback__button-submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Invio in corso...' : 'Invia Feedback'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
