import React, { useEffect } from "react";
import "./BookingOptions.css";
import { SelectSeat, isSelectSeatValid } from "./SelectSeat";
import { FlightDetails } from "./FlightDetails";
import SelectLuggage, { isSecurityReferenceValid, isSelectLuggageValid } from "./SelectLuggage";
import { toggleColorOnclick } from "../../helperMethods/events/events";
import { Link, useNavigate } from "react-router-dom";


export default function BookingOptions(props) {

    const navigate = useNavigate();
    const className = "BookingOptions";
    
    useEffect(() => {
        // toggle button color
        const submitButton = document.getElementById("Submit-button");
        toggleColorOnclick(submitButton, "gray");
    }, [])

    function handleContinue() {

        const securityCheckBox = document.getElementById("SelectLuggage-security-checkBox")
        const securityErrorMessage = document.getElementById("SelectLuggage-error-message");

        ((securityCheckBox as HTMLInputElement).checked) ?
            navigate("/register") :
            securityErrorMessage!.style.display = "block"
    }

    return (
        <div className={className}>
            <h1>Booking options</h1>

            <div className={className + "-container"}>
                <SelectSeat className="SelectSeat"/>

                <SelectLuggage className="SelectLuggage"/> 

                <FlightDetails className="FlightDetails"/>

                <button id={className + "-button"} onClick={handleContinue}>Continue</button>
            </div>
        </div>
    )
}