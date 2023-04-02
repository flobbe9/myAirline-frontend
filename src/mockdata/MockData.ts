import { Airport } from "./Airport"
import { City } from "./City"
import Flight from "./Flight";


const mockCities: City[] = [
    {
        name: "Frankfurt",
        country: "Germany"        
    },
    {
        name: "Dortmund",
        country: "Germany"        
    },
    {
        name: "Hamburg",
        country: "Germany"        
    },
    {
        name: "Berlin",
        country: "Germany"        
    },
    {
        name: "München",
        country: "Germany"        
    },
    {
        name: "Bremen",
        country: "Germany"        
    }
];


// export const mockAirports: Airport[] = [
//     {
//         name: "Frankfurter Flughafen",
//         city: mockCities[0],
//         zipCode: 12345
//     },
//     {
//         name: "Dortmunder Flughafen",
//         city: mockCities[0],
//         zipCode: 12345
//     },
//     {
//         name: "Hamburger Flughafen",
//         city: mockCities[0],
//         zipCode: 12345
//     },
//     {
//         name: "Berliner Flughafen",
//         city: mockCities[0],
//         zipCode: 12345
//     },
//     {
//         name: "Münchner Flughafen",
//         city: mockCities[0],
//         zipCode: 12345
//     },
//     {
//         name: "Bremen Flughafen",
//         city: mockCities[0],
//         zipCode: 12345
//     }
// ];


export const mockFlights: Flight[] = [
    {
        airlineName: "RayanAir",
        departureAirportName: "Hamburg airport",
        arrivalAirportName: "Munich airport",
        departureTime: "10:00",
        arrivalTime: "12:45",
        price: 34.00
    }
]

export function isValid(obj): boolean {

    let isValid = true;

    Object.entries(obj).forEach(([key, value]) => {
        if (!key || !value)
            isValid = false;
    });

    return isValid;
}