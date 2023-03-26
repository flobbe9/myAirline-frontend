import React, { useEffect, useState } from "react";
import "./BuyNow.css";
import "./FlightDetails.css";
import { toggleColorOnclick } from "../../helperMethods/events/events";
import sendHttpRequest from "../../helperMethods/fetch/fetch";
import FlightDetails, { initialFlightDetails } from "../bookingOptions/FlightDetails";
import { useParams } from "react-router-dom";


export default function BuyNow(props) {

    const [flightDetails, setFlightDetails] = useState(initialFlightDetails);
    const flightId = useParams().id;
    const className = "BuyNow";

    // TODO: remove these later
    const firstName = "Florin";
    const surName = "Schikarksi";
    const email = "florin735@live.com";

    useEffect(() => {
        // fetch flight details
        if (flightDetails === initialFlightDetails) 
            fetchFlightDetails(flightId, setFlightDetails);

        // toggle button color
        const submitButton = document.getElementById(className + "-submit");
        toggleColorOnclick(submitButton, "gray");
    })

    function handleSubmit() {
        alert("Booking complete") // TODO: remove later
    }

    return (
        <div className={className}>
            <h1>Overview</h1>

            <div className={className + "-container"}>

                {/* flightdetails */}
                <div className={className + "-userDetails"}>
                    <div style={{listStyle:"none"}}>
                        {firstName + " " + surName}
                        <br />
                        {email}
                    </div>
                </div>

                <FlightDetails className={className + "-flightDetails"} />
                <br />

                <button id={className + "-submit"} onClick={handleSubmit}>Buy now</button>
            </div>
        </div>)
}


async function fetchFlightDetails(flightId, setFlightDetails) {

    // set flightDetails on resolve
    return await sendHttpRequest("http://localhost:4001/flight/details/" + flightId, "post", "application/json")
        .then(jsonResponse => setFlightDetails(jsonResponse));
}