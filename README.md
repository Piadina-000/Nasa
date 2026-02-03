# 🚀 NASA Explorer
Esplora l'universo attraverso i dati della NASA - speriamo che questa sia la volta buona e che funzioni tutto finalmente :,)

Questa è una seconda versione del progetto in quanto la prima mi è esplosa...

---

## 📖 Descrizione

**NASA Explorer** è una Single Page Application che permette di visualizzare dati astronomici in tempo reale utilizzando le API pubbliche della NASA. L'applicazione mostra immagini astronomiche giornaliere (APOD) e asteroidi vicini alla Terra (NEO), con un'interfaccia intuitiva.

Progetto sviluppato per l'esame **UF07WEB** - Anno Accademico 2025/26

### Cosa fa l'app?

L'app si connette direttamente alle API della NASA per mostrare:
-  **APOD (Astronomy Picture of the Day)**: L'immagine o video astronomico del giorno, scelto dalla NASA, con una spiegazione scientifica dettagliata
-  **NEO (Near Earth Objects)**: Lista di asteroidi che passano vicino alla Terra oggi, con informazioni su dimensioni, velocità e pericolosità
-  **Sistema Feedback**: Un form per permettere agli utenti di segnalare bug o richiedere nuove feature

### Perché questo progetto?

Volevo creare qualcosa di interessante che combinasse la mia passione per lo spazio con quello che ho imparato nel corso. Le API della NASA sono gratuite, ben documentate e offrono dati davvero interessanti!

---

## ⚙️ Requisiti

Per far girare il progetto ti serve:

- **Node.js** 
- **npm** 

---

## 📦 Installazione

Ecco i passi per installare e avviare il progetto:

```bash
# 1. Clona il repository
git clone https://github.com/Piadina-000/Nasa.git

# 2. Entra nella cartella del progetto
cd Nasa

# 3. Installa tutte le dipendenze
npm install

# 4. (Opzionale) Sostituisci l'API Key
# Se vuoi usare la tua chiave NASA personale (consigliato per evitare rate limit):
# - Vai su https://api.nasa.gov e richiedi una chiave gratuita
# - Apri src/pages/ApodPage.tsx e src/pages/NeosPage.tsx
# - Sostituisci la variabile API_KEY con la tua chiave
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

Crea una versione ottimizzata nella cartella `dist/`

### Anteprima build di produzione

```bash
npm run preview
```

---

## 📁 Struttura del Progetto

```
nasa-explorer/
├── public/                   
├── src/
│   ├── components/          # Componenti riutilizzabili
│   │   ├── ErrorMessage.*   # Gestione e visualizzazione errori
│   │   ├── Feedback.*       # Form di feedback utente
│   │   ├── Header.*         # Barra di navigazione
│   │   ├── Loading.*        # Spinner di caricamento
│   │   └── index.ts         # Export centralizzato
│   ├── pages/               
│   │   ├── ApodPage.tsx     # Pagina APOD 
│   │   ├── NeosPage.tsx     # Lista asteroidi NEO
│   │   ├── NeoDetail.tsx    # Dettaglio singolo asteroide
│   │   ├── NotFound.tsx     # Pagina 404
│   │   └── index.ts         # Export pagine
│   ├── types/               
│   │   ├── apod.types.ts    # Tipi per APOD
│   │   ├── neo.types.ts     # Tipi per NEO
│   │   ├── feedback.types.ts # Tipi per feedback
│   │   ├── common.types.ts  # Tipi condivisi
│   │   ├── error.types.ts   # Tipi per errori
│   │   └── index.ts         # Export tipi
│   ├── style/               
│   ├── App.tsx              
│   ├── main.tsx             
│   └── index.css            
├── eslint.config.js         
├── tsconfig.json            
├── vite.config.ts           
└── package.json             
```

- **`components/`**: Componenti riutilizzabili 
- **`pages/`**: Componenti rappresentano intere pagine
- **`types/`**: Tutte le definizioni TypeScript
- **`style/`**: CSS separato per ogni pagina

---

## 🛠️ Tecnologie Utilizzate

### Frontend
- **React** - Libreria UI per costruire interfacce reattive
- **TypeScript** - JavaScript con tipizzazione statica (aiuta a trovare errori prima del runtime)
- **CSS** 

---

## ✨ Funzionalità

### ✅ Implementate

- **Pagina APOD**: 
  - Visualizza immagine/video del giorno
  - Mostra titolo, data e spiegazione scientifica
  - Supporto video YouTube
  - Modale per vedere immagini a schermo intero
  - Navigazione tra date
  
- **Pagina NEO**: 
  - Lista di tutti gli asteroidi di oggi
  - Statistiche: totale, pericolosi, sicuri
  - Filtri 
  - Link ai dettagli di ogni asteroide
  
- **Dettaglio NEO**: 
  - Info complete sull'asteroide
  - Dimensioni, velocità, distanza
  - Warning visivo se è pericoloso
  
- **Gestione Errori**: 
  - Messaggi specifici per tipo di errore
  - Pulsante "Riprova" per tentare di nuovo
  - Gestione rate limit API
  
- **Performance**: 
  - Sistema di cache
  - Timeout sulle richieste
  - Retry automatico
  
- **UX**: 
  - Loading states con spinner
  - Transizioni
  - Responsive
  - Form feedback per segnalazioni

---

## 🔑 API NASA - Setup

### Come funziona?

L'app usa le **API pubbliche della NASA**, che sono gratuite ma richiedono una chiave (API Key).

### Ottenere la tua API Key (consigliato!)

1. Vai su [api.nasa.gov](https://api.nasa.gov)
2. Scorri fino a "Get Your API Key"
3. Compila il form con:
   - Nome
   - Cognome
   - Email
4. Riceverai la chiave via email in pochi minuti

### Dove inserirla nel codice?

Cerca questa riga nei file `ApodPage.tsx`, `NeosPage.tsx` e `NeoDetail.tsx`:

```typescript
const API_KEY = '...'; // ← Sostituisci qui
```
---

## 📊 Stato del Progetto

🟢 **In sviluppo** (Febbraio 2026)

Progetto per l'esame **UF07WEB** - Anno Accademico 2025/26

---

## 👤 Autore

**Carmen**  
📧 Email: carmen.nuvoli@mat.tn.it  
🎓 Corso: UF07WEB - Anno Accademico 2025/26  
🔗 GitHub: [@Piadina-000](https://github.com/Piadina-000)

---

## 📄 Licenza

Progetto sviluppato a scopo didattico per un esame.