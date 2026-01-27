import { Routes, Route } from 'react-router-dom';
import { ApodPage } from './pages/ApodPage';
import { NotFound } from './pages/NotFound';
import './App.css';

/**
 * Componente principale dell'app NASA Explorer
 * Gestisce il routing per tutte le pagine principali
 */
function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<ApodPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            
        </div>
    );
}

export default App;
