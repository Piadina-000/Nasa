/**
 * TIPI NEO 
 */


export interface DiameterEstimate {
    kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
    meters: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
}


export interface CloseApproachData {
    close_approach_date: string;
    close_approach_date_full: string;
    relative_velocity: {
        kilometers_per_second: string;
    };
    miss_distance: {
        kilometers: string;
    };
}

/**
 * NEO 
 */
export interface NeoObject {
    id: string;
    neo_reference_id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: DiameterEstimate;
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
