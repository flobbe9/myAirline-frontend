import { City } from "./City";


export interface Airport {
    name: string,
    city: City,
    zipCode: number
}


export function isAirportValid(airport: Airport): boolean {

    let isValid = true;

    Object.entries(airport).forEach(([key, value]) => {
        if (!key || !value)
            isValid = false;
    });

    return isValid;
}