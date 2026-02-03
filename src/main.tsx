/**
 * ENTRY POINT DELL'APPLICAZIONE NASA EXPLORER
 * 
 * Questo è il file principale che avvia l'app. 
 * Qui configuro:
 * - React Query per gestire le chiamate API
 * - React Router per la navigazione tra le pagine
 * - StrictMode per aiutarmi a trovare errori durante lo sviluppo
 * 
 * @author Carmen - Progetto per UF07WEB
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Creo un'istanza di QueryClient per gestire cache e stato delle API
const queryClient = new QueryClient()

// App React nel DOM
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* QueryClient gestisce tutte le chiamate API con cache automatica */}
        <QueryClientProvider client={queryClient}>
            {/* Router abilita la navigazione tra le pagine senza ricaricare */}
            <Router>
                <App />
            </Router>
        </QueryClientProvider>
    </StrictMode>,
)
