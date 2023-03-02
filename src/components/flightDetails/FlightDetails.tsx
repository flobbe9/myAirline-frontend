import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import "./SelectSeat.css";
import { useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch";
import { Flight } from "../searchResult/SearchResult";


export default function BookFlight(props) {
    // state
    
        
    return (
        <div className="BookFlight">
            <h1>Book your flight</h1>

            <SelectSeat className="SelectSeat-container" />

            <FlightDetails className="FlightDetails-container" />

            {/* add all page3 sub pages here */}

        </div>
    )
}


function FlightDetails(props) {
    const [flightDetails, setFlightDetails] = useState(initialFlightDetails);
    const flightId = useParams().id;

    useEffect(() => {
        // fetch flight details
        async function fetchFlightDetails() {
            await sendHttpRequest("http://localhost:4001/flight/details/" + flightId, "post", "application/json")
                .then(jsonResponse => setFlightDetails(jsonResponse));
            }

        // prevent infinite loop
        if (flightDetails === initialFlightDetails)
            fetchFlightDetails();
    }, [flightDetails, flightId])

    const className = props.className;
    return (
        <div className={className}>
            <div className={className + "-heading"}>Details</div>
            <hr />

            {/* Departure */}
            <section className={className + "-item-departure"}>
                <div>
                    {flightDetails.departureAirport}
                    <div className={className + "-item-arrow"}>{" -> "}</div>
                </div>
                <br />

                <div className={className + "-item-details"}>{flightDetails.departureDate}</div>
                <div className={className + "-item-details"}>{flightDetails.departureTime}</div>
                <br />

                <div className={className + "-item-airline"}>WizzAir</div>
            </section>

            {/* Arrival */}
            <section className={className + "-item-arrival"}>
                <div>{flightDetails.arrivalAirport}</div>
                <br />

                <div className={className + "-item-details"}>{flightDetails.arrivalDate}</div>
                <div className={className + "-item-details"}>{flightDetails.arrivalTime}</div>
                <br />

                <div className={className + "-item-price"}>34€</div>
            </section>
            <hr />

            <section>
                Seat
            </section>
            <hr />

            <section>
                Luggage
            </section>
            <hr />
        </div>
    )
}


function SelectSeat(props) {

    return (
        <div className={props.className}>
            <h2>Select your seat</h2>

            <div>
                
            </div>
        </div>
    )
}


interface FlightDetailsWrapper {
    departureAirport;
    arrivalAirport;
    departureDate;
    arrivalDate;
    departureTime;
    arrivalTime;
    id;
}


const initialFlightDetails: FlightDetailsWrapper = {
    departureAirport: undefined,
    arrivalAirport: undefined,
    departureDate: undefined,
    arrivalDate: undefined,
    departureTime: undefined,
    arrivalTime: undefined,
    id: undefined
}