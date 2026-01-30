# 🚀 NASA Explorer
Esplora l'universo attraverso i dati della NASA - speriamo che questa sia la volta buona e che funzioni finalmente :,)

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
git clone https://github.com/tuoutente/nasa-explorer.git

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

### Build per produzione

```bash
npm run build
```

I file ottimizzati saranno nella cartella `dist/`

### Preview build di produzione

```bash
npm run preview
```

### Verifica errori ESLint

```bash
npm run lint
```

---

## � Struttura del Progetto

```

```
---

## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI
- **TypeScript 5.9** - Tipizzazione statica
- **Vite 7** - Build tool ultrarapido
- **React Router 7** - Gestione routing SPA
- **React Query 5** - Gestione stato e cache API
- **Fetch API** - Chiamate HTTP native
- **CSS3** - Styling con animazioni

---

## ✨ Funzionalità

### Implementate

- ✅ **Pagina APOD**: Visualizza l'immagine astronomica del giorno con descrizione
- ✅ **Navigazione date**: Naviga tra le immagini di giorni diversi
- ✅ **Pagina NEO**: Elenco asteroidi vicini alla Terra (oggi)
- ✅ **Filtri NEO**: Filtra per pericolosità (Hazardous/Safe/All)
- ✅ **Dettaglio NEO**: Visualizza informazioni complete su ogni asteroide
- ✅ **Pagina 404**: Gestione URL non validi
- ✅ **Gestione errori**: Messaggi specifici per ogni tipo di errore
- ✅ **Loading states**: Spinner durante il caricamento
- ✅ **Form feedback**: Invio feedback utenti con validazione

---

## � API Utilizzata

### NASA Open APIs

- **Endpoint base**: `https://api.nasa.gov`
- **Documentazione**: [api.nasa.gov](https://api.nasa.gov)

#### Endpoints usati:

1. **APOD** (Astronomy Picture of the Day)
   - URL: `/planetary/apod`
   - Metodo: GET
   - Parametri: `api_key`, `date` (opzionale)

2. **NEO** (Near Earth Objects)
   - URL: `/neo/rest/v1/feed`
   - Metodo: GET
   - Parametri: `api_key`, `start_date`, `end_date`

#### Rate Limiting

- **DEMO_KEY**: 30 richieste/ora, 50/giorno
- **Personal Key**: 1000 richieste/ora

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