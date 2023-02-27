import { City } from "./City";

export default interface Flight {
    airline: string,
    departureCity: City,
    destinationCity: City,
    departureTime: string,
    arrivalTime: string,
    price: number
}