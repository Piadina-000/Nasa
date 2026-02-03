/**
 * COMPONENTE PRINCIPALE - APP.TSX
 * 
 * E' il cuore dell'applicazione!!!!! 
 * Qui definisco tutte le rotte che permettono di navigare tra 
 * le diverse pagine del sito.
 * 
 * STRUTTURA DELLE PAGINE:
 * - / → ApodPage: mostra l'immagine astronomica del giorno
 * - /neos → NeosPage: lista degli asteroidi vicini alla Terra oggi
 * - /neos/:neoId → NeoDetailPage: dettagli specifici di un asteroide
 * - * → NotFound: pagina 404 per le rotte non esistenti
 * 
 * Ho anche inserito il componente Feedback che resta sempre visibile
 * così gli utenti possono mandare segnalazioni in qualsiasi momento.
 * 
 * @author Carmen - UF07WEB 2025/26
 */

import { Routes, Route } from 'react-router-dom';
import { ApodPage } from './pages/ApodPage';
import { NeosPage } from './pages/NeosPage';
import { NeoDetailPage } from './pages/NeoDetail';
import { NotFound } from './pages/NotFound';
import { Feedback } from './components/Feedback';
import './App.css';

function App() {
    return (
        <div className="app">
            {/* Definisco tutte le rotte dell'applicazione */}
            <Routes>
                {/* Pagina iniziale: APOD */}
                <Route path="/" element={<ApodPage />} />
                
                {/* Pagina lista asteroidi */}
                <Route path="/neos" element={<NeosPage />} />
                
                {/* Pagina dettaglio singolo asteroide (parametro dinamico :neoId) */}
                <Route path="/neos/:neoId" element={<NeoDetailPage />} />
                
                {/* Catch-all per pagine non trovate */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Componente feedback sempre visibile in basso a destra */}
            <Feedback />
        </div>
    );
}

export default App;
