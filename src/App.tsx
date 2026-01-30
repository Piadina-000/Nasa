import { Routes, Route } from 'react-router-dom';
import { ApodPage } from './pages/ApodPage';
import { NeosPage } from './pages/NeosPage';
import { NeoDetailPage } from './pages/NeoDetail';
import { NotFound } from './pages/NotFound';
import { Feedback } from './components/Feedback';
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
                <Route path="/neos" element={<NeosPage />} />
                <Route path="/neos/:neoId" element={<NeoDetailPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Feedback />
        </div>
    );
}

export default App;
