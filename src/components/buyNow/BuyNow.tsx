import React, { useEffect } from "react";
import "./BuyNow.css";
import { toggleColorOnclick } from "../../helperMethods/events/events";


export default function BuyNow(props) {

    const className = "BuyNow";
    const firstName = "Florin";
    const surName = "Schikarksi";
    const email = "florin735@live.com";

    useEffect(() => {
        // toggle button color
        const submitButton = document.getElementById(className + "-submit");
        toggleColorOnclick(submitButton, "gray");
    })

    function handleSubmit() {
        alert("Booking complete")
    }

    return (
        <div className={className}>
            <h1>Overview</h1>

            <div className={className + "-container"}>

                {/* flightdetails */}
                <h3>FlightDetails</h3>
                <div className={className + "-userDetails"}>
                    <ul style={{listStyle:"none"}}>
                        <li>{firstName + " " + surName}</li>
                        <li>{email}</li>
                    </ul>
                </div>

                <div className={className + "-flightDetails"}>
                    FlightDetails
                </div>

                <button id={className + "-submit"} onClick={handleSubmit}>Buy now</button>
            </div>
        </div>)
}