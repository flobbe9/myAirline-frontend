import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import { Link, useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch.ts";


export default function SearchResult (props) {
    // state
    const [flightDetailsArr, setFlightDetailsArr] = useState(null);
    const params = useParams();

    useEffect(() => {
        // fetch flight details
        async function fetchFlightDetails() {
            await sendHttpRequest("http://localhost:4001/flight/search", "post", "application/json", params)
                .then(jsonResponse => setFlightDetailsArr(jsonResponse));
        }

        // prevent infinite loop
        if (flightDetailsArr === null) 
            fetchFlightDetails();
    })

    return (
        <div className="SearchResult">
            <h1>Search results</h1>

            <div className="SearchResult-container">
                {
                    flightDetailsArr?
                    (flightDetailsArr as []).map(flightDetails => (
                        <FlightDetails className="SearchResult-item" flightDetails={flightDetails} />
                    )):
                    (<div style={{height:"1000px"}}></div>)
                }
            </div>
        </div>
    )
}


function FlightDetails(props) {

    function handleClick() {
        
    }

    const flightDetails = props.flightDetails;

    return (
        <div className={props.className} onClick={handleClick}>
            <Link to="/searchResult/flightDetails">
                <div className={props.className + "-departure"}>
                    <div>
                        {flightDetails.departureCity}
                        <div className={props.className + "-arrow"}>
                            {"->"}
                        </div>
                    </div>
                    <div>{flightDetails.departureTime} </div >
                    <div className={props.className + "-details"}>27.02.23</div>
                    <br />
                    <div className={props.className + "-airline"}>RaynAir</div>
                </div>

                <div className={props.className + "-destination"}>
                    <div>{flightDetails.arrivalCity}</div>
                    <div>{flightDetails.arrivalTime}</div>
                    <div className={props.className + "-details"}>27.02.23</div>
                    <br />
                    <div className={props.className + "-price"}>34,00€</div>
                </div>
            </Link>
        </div>
    )
}