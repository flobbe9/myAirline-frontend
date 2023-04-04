import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch.ts";
import { toggleColorOnclick } from "../../helperMethods/events/events.ts";


export default function SearchResult (props) {

    const [flights, setFlights] = useState(null);
    const className = "SearchResult";
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        // fetch and set flight
        if (flights === null) 
            fetchFlight(setFlights, params);

        // toggle button color
        toggleColorOnclick(document.getElementById(className + "-goBack"), "rgb(230, 230, 230)");
    }, [flights, params])

    return (
        <div className={className}>
            <h1>Search results</h1>

            <p id={className + "-noResults"}>We could not find flights by your specifications. <br />
                Please check your input and make sure you only entered suggested airports. <br />

                <button id={className + "-goBack"} onClick={() => navigate("/")}>Go back</button>
            </p>

            <div className={className + "-container"}>
                {flights?
                    Array.from(flights).map(flight => (
                        <Flight className={className} flight={flight} />
                    )) : 
                        (<div style={{height:"fit-content"}}></div>)
                }
            </div>
        </div>
    )
}


function Flight(props) {

    const className = props.className;
    const flight = props.flight;

    return (
        <div className={className + "-item"} >
            <Link to={"/searchResult/bookingOptions/" + flight.id}>
                <div className={className + "-departure"}>
                    <div>
                        {flight.departureAirportName}
                        <div className={className + "-arrow"}>
                            {"->"}
                        </div>
                    </div>
                    <div>{flight.departureTime} </div >
                    <div className={className + "-details"}>{flight.departureDate}</div>
                    <br />
                    <div className={className + "-airline"}>{flight.airlineName}</div>
                </div>

                <div className={className + "-destination"}>
                    <div>{flight.arrivalAirportName}</div>
                    <div>{flight.arrivalTime}</div>
                    <div className={className + "-details"}>{flight.arrivalDate}</div>
                    <br />
                    <div className={className + "-price"}>{flight.basePrice}€</div>
                </div>
            </Link>
        </div>
    )
}


async function fetchFlight(setFlights, params) {

    const url = "http://localhost:4001/flight/search?" + 
                "departureAirportName=" + params.from +
                "&arrivalAirportName=" + params.to + 
                "&departureDate=" + params.date + 
                "&departureTime=" + params.time;
    const errorMessage = document.getElementById("SearchResult-noResults");

    // set flights state
    await sendHttpRequest(url, "get")
        .then(jsonResponse => {
            // alert(jsonResponse.length)
            (jsonResponse.length === 0 || jsonResponse.status) ? 
                errorMessage!.style.display = "block" : setFlights(jsonResponse)
        });

}