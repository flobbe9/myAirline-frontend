import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import { Link, useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch.ts";


export default function SearchResult (props) {

    const [flights, setFlights] = useState(null);
    const className = "SearchResult";
    const params = useParams();

    useEffect(() => {
        // fetch and set flight
        if (flights === null) 
            fetchFlight(setFlights, params);
    }, [])

    return (
        <div className={className}>
            <h1>Search results</h1>

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


async function fetchFlight(setFlights, params) {

    // set flights state
    await sendHttpRequest("http://localhost:4001/flight/search", "post", params, "application/json")
        .then(jsonResponse => setFlights(jsonResponse));

    // return height to normal
    (document.getElementsByClassName("SearchResult")[0] as HTMLElement).style.height = "fit-content";
}