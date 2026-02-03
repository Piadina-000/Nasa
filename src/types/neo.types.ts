/**
 * TIPI NEO - Near Earth Objects
 * 
 * Definizioni TypeScript per gli asteroidi vicini alla Terra.
 * La NASA traccia migliaia di NEO per valutare potenziali rischi.
 * 
 * @see https://api.nasa.gov/#NeoWS
 * @author Carmen - UF07WEB
 */

/**
 * Stima del diametro dell'asteroide
 * 
 * La NASA fornisce range min/max perché la dimensione esatta
 * è difficile da calcolare (dipende da riflettività, distanza, ecc.)
 */
export interface DiameterEstimate {
    /** Diametro stimato in chilometri */
    kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
    /** Diametro stimato in metri */
    meters: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
}

/**
 * Dati sull'avvicinamento alla Terra
 * 
 * Contiene info su quando e quanto vicino passerà l'asteroide.
 * Gli asteroidi possono avere più avvicinamenti futuri.
 */
export interface CloseApproachData {
    /** Data di avvicinamento (YYYY-MM-DD) */
    close_approach_date: string;
    
    /** Data e ora completa dell'avvicinamento */
    close_approach_date_full: string;
    
    /** Velocità relativa rispetto alla Terra */
    relative_velocity: {
        kilometers_per_second: string;
    };
    
    /** Distanza minima dalla Terra durante il passaggio */
    miss_distance: {
        kilometers: string;
    };
}

/**
 * Oggetto NEO completo
 * 
 * Rappresenta un asteroide vicino alla Terra con tutti i suoi dati.
 * Questi oggetti vengono tracciati dal JPL (Jet Propulsion Laboratory) della NASA.
 */
export interface NeoObject {
    /** ID univoco dell'asteroide */
    id: string;
    
    /** ID di riferimento NEO */
    neo_reference_id: string;
    
    /** Nome dell'asteroide */
    name: string;
    
    /** Se l'asteroide è classificato come potenzialmente pericoloso */
    is_potentially_hazardous_asteroid: boolean;
    
    /** Dimensioni stimate dell'asteroide */
    estimated_diameter: DiameterEstimate;
    
    /** Lista di tutti gli avvicinamenti passati/futuri alla Terra */
    close_approach_data: CloseApproachData[];
}

/** Per status di pericolosità */
export type HazardStatus = 'hazardous' | 'safe';

export type NeoWithStatus = NeoObject & {
    hazardStatus: HazardStatus;
};

export type NeoListResponse = NeoObject[];

/** Filtri per NEO */
export type NeoFilters = {
    onlyHazardous?: boolean;
    minDiameter?: number;
    maxDiameter?: number;
};
