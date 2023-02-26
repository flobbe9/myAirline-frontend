import { Airport } from "./Airport"
import { City } from "./City"


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


export const mockAirports: Airport[] = [
    {
        name: "Frankfurter Flughafen",
        city: mockCities[0],
        zipCode: 12345
    },
    {
        name: "Dortmunder Flughafen",
        city: mockCities[0],
        zipCode: 12345
    },
    {
        name: "Hamburger Flughafen",
        city: mockCities[0],
        zipCode: 12345
    },
    {
        name: "Berliner Flughafen",
        city: mockCities[0],
        zipCode: 12345
    },
    {
        name: "Münchener Flughafen",
        city: mockCities[0],
        zipCode: 12345
    },
    {
        name: "Bremen Flughafen",
        city: mockCities[0],
        zipCode: 12345
    }
];