# 🚀 NASA Explorer
Esplora l'universo attraverso i dati della NASA - speriamo che questa sia la volta buona e che funzioni tutto finalmente :,)

Questa è una seconda versione del progetto in quanto la prima mi è esplosa...

---

## 📖 Descrizione

**NASA Explorer** è una Single Page Application che permette di visualizzare dati astronomici in tempo reale utilizzando le API pubbliche della NASA. L'applicazione mostra immagini astronomiche giornaliere (APOD) e asteroidi vicini alla Terra (NEO), con un'interfaccia intuitiva.

Progetto sviluppato per l'esame **UF07WEB** - Anno Accademico 2025/26

---

## ⚙️ Requisiti

- **Node.js**
- **npm**
---

## 📦 Installazione

```bash
# 1. Clona il repository
git clone https://github.com/Piadina-000/Nasa.git

# 2. Entra nella cartella del progetto
cd nasa-explorer

# 3. Installa le dipendenze
npm install

# 4. (Facoltativo) Sostituisci l'API Key
# Apri src/pages/ApodPage.tsx e src/pages/NeosPage.tsx
# Modifica la costante API_KEY con la tua chiave personale
```

---

## 🚀 Utilizzo

### Avvio in modalità sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile su **http://localhost:5173**

---

## 📁 Struttura del Progetto

```
nasa-explorer/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ErrorMessage.tsx
│   │   ├── ErrorMessage.css
│   │   ├── Feedback.tsx
│   │   ├── Feedback.css
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Loading.tsx
│   │   ├── Loading.css
│   │   └── index.ts
│   ├── core/
│   ├── img/
│   ├── pages/
│   │   ├── ApodPage.tsx
│   │   ├── NeosPage.tsx
│   │   ├── NeoDetail.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── style/
│   ├── styles/
│   ├── types/
│   │   ├── apod.types.ts
│   │   ├── common.types.ts
│   │   ├── component.types.ts
│   │   ├── error.types.ts
│   │   ├── feedback.types.ts
│   │   ├── neo.types.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```
---

## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI
- **TypeScript 5.9** - Tipizzazione statica
- **Vite 7** - Build tool ultrarapido
- **React Router 7** - Gestione routing SPA
- **React Query 5** - Gestione stato e cache API
- **Fetch API** - Chiamate HTTP native
- **CSS** - Styling

---

## ✨ Funzionalità

### Implementate

- ✅ **Pagina APOD**: Visualizza l'immagine astronomica del giorno con descrizione
- ✅ **Navigazione date**: Naviga tra le immagini di giorni diversi
- ✅ **Pagina NEO**: Elenco asteroidi vicini alla Terra (oggi)
- ✅ **Filtri NEO**: Filtra per pericolosità (Hazardous/Safe/All)
- ✅ **Dettaglio NEO**: Visualizza informazioni complete su ogni asteroide
- ✅ **Pagina 404**: Gestione degli URL non validi
- ✅ **Gestione errori**: Messaggi specifici per ogni tipo di errore
- ✅ **Loading states**: Spinner durante il caricamento
- ✅ **Form feedback**: Invio feedback utenti con validazione

---

## 🔑 Credenziali e Configurazione API

### NASA API Key

L'applicazione utilizza le **API pubbliche della NASA** che richiedono una chiave API (gratuita).

#### Come ottenere la chiave API:

1. Visita [api.nasa.gov](https://api.nasa.gov)
2. Compila il form con i tuoi dati
3. Riceverai la chiave via email in pochi minuti

#### Dove configurarla:

La chiave API è attualmente nei file:
- **APOD**: `src/pages/ApodPage.tsx` (riga 9)
- **NEO**: `src/pages/NeosPage.tsx` (riga 9)

**Per cambiarla:**
```typescript
const API_KEY = '...'; 
```

#### Rate Limiting:
- **Demo Key**: 30 richieste/ora, 50/giorno
- **Personal Key**: 1000 richieste/ora (consigliato)

---

## � API Utilizzata

### NASA Open APIs

**Endpoint base**: `https://api.nasa.gov`  
**Documentazione**: [api.nasa.gov](https://api.nasa.gov)

#### Endpoints implementati:

1. **APOD** (Astronomy Picture of the Day)
   - **URL**: `/planetary/apod`
   - **Metodo**: GET
   - **Parametri**: 
     - `api_key` (required)
     - `date` (optional) - Formato: YYYY-MM-DD
   - **Descrizione**: Restituisce l'immagine astronomica del giorno

2. **NEO** (Near Earth Objects)
   - **URL**: `/neo/rest/v1/feed`
   - **Metodo**: GET
   - **Parametri**:
     - `api_key` (required)
     - `start_date` (required) - Formato: YYYY-MM-DD
     - `end_date` (required) - Formato: YYYY-MM-DD
   - **Descrizione**: Restituisce lista di asteroidi vicini alla Terra
   - **Filtri implementati**: Per pericolosità (hazardous/safe)

---

## 📊 Stato del Progetto

🟢 **Progetto in corso** (Gennaio 2026)

Sviluppato come progetto d'esame per **UF07WEB**

---

## 👤 Autore

**Carmen**  
📧 Email: carmen.nuvoli@mat.tn.it  
🎓 Corso: UF07WEB - Anno Accademico 2025/26

---

## 📄 Licenza

Progetto sviluppato a scopo didattico per un esame.