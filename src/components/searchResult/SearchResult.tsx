import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import { Link, useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch.ts";


export default function SearchResult (props) {
    // state
    const [flights, setflights] = useState(null);
    const params = useParams();

    useEffect(() => {
        // fetch flight
        async function fetchFlight() {
            await sendHttpRequest("http://localhost:4001/flight/search", "post", "application/json", params)
                .then(jsonResponse => setflights(jsonResponse));
        }

        // prevent infinite loop
        if (flights === null) 
            fetchFlight();
    })

    return (
        <div className="SearchResult">
            <h1>Search results</h1>

            <div className="SearchResult-container">
                {flights?
                    Array.from(flights).map(flight => (
                        <Flight flight={flight} />
                    )) : 
                        (<div style={{height:"fit-content"}}></div>)
                }
            </div>
        </div>
    )
}


function Flight(props) {

    const className = "SearchResult";
    const flight = props.flight;

    return (
        <div className={className + "-item"} >
            <Link to={"/searchResult/bookingOptions/" + flight.id}>
                <div className={className + "-departure"}>
                    <div>
                        {flight.departureAirport}
                        <div className={className + "-arrow"}>
                            {"->"}
                        </div>
                    </div>
                    <div>{flight.departureTime} </div >
                    <div className={className + "-details"}>27.02.23</div>
                    <br />
                    <div className={className + "-airline"}>RaynAir</div>
                </div>

                <div className={className + "-destination"}>
                    <div>{flight.arrivalAirport}</div>
                    <div>{flight.arrivalTime}</div>
                    <div className={className + "-details"}>27.02.23</div>
                    <br />
                    <div className={className + "-price"}>34,00€</div>
                </div>
            </Link>
        </div>
    )
}