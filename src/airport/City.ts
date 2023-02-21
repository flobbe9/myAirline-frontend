export interface City {
    name: string,
    country: string
}


export function isCityValid(city: City): boolean {

    let isValid = true;

    Object.entries(city).forEach(([key, value]) => {
        if (!key || !value)
            isValid = false;
    });

    return isValid;
}