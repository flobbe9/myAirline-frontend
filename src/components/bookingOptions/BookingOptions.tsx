import React, { useEffect, useState } from "react";
import "./BookingOptions.css";
import { SelectSeat, isSelectSeatValid } from "./SelectSeat";
import { FlightDetails } from "./FlightDetails";
import SelectLuggage, { isSecurityReferenceValid, isSelectLuggageValid } from "./SelectLuggage";
import { addEventListenerForClass, toggleColorOnclick } from "../../helperMethods/events/events";
import { Link } from "react-router-dom";


export default function BookingOptions(props) {

    return (
        <div className="BookingOptions">
            <h1>Booking options</h1>

            <div className="BookingOptions-container">
                <SelectSeat className="SelectSeat"/>

                <SelectLuggage className="SelectLuggage"/> 

                <FlightDetails className="FlightDetails"/>

                <Submit className="Submit" /> 
            </div>
        </div>
    )
}


// TODO: rename this shit
function Submit(props) {
    
    const [isBookingValid, setIsBookingValid] = useState(false);
    const [isSeatValid, setIsSeatValid] = useState(false);
    const [isSecurityConsent, setIsSecurityConsent] = useState(false);
    
    const className = props.className;
    
    useEffect(() => {
        // toggle button color
        const submitButton = document.getElementById("Submit-button");
        toggleColorOnclick(submitButton, "gray");
    }, [])

    const submitButton = <button id={className + "-button"} onMouseOver={() => handleMouseOver(setIsBookingValid, setIsSeatValid, setIsSecurityConsent)} onClick={() => showErrorMsg(isBookingValid, isSeatValid, isSecurityConsent)}>Continue</button>

    return (
        <div className={className + "-container"}>
            {isBookingValid && isSecurityConsent && isSeatValid ?
                <Link to="/searchResult/userDetails">
                    {submitButton}
                </Link> :
                <>{submitButton}</>
            }

            <div id={className + "-error-message"}>We're sorry, something went wrong. Please reload the page and try again.</div>
        </div>)
}


function handleMouseOver(setIsBookingValid, setIsSeatValid, setIsSecurityConsent) {

    setIsBookingValid(isSelectLuggageValid());

    setIsSeatValid(isSelectSeatValid());

    setIsSecurityConsent(isSecurityReferenceValid());
}


function showErrorMsg(isBookingValid, isSeatValid, isSecurityConsent) {

    const securityErrorMessage = document.getElementById("SelectLuggage-error-message");
    const seatErrorMessge = document.getElementById("SelectSeat-errorMessage");
    const generalErrorMessge = document.getElementById("Submit-error-message");

    // null check
    if (!securityErrorMessage || !seatErrorMessge || !generalErrorMessge) 
        return;

    // general error messge
    if (!isBookingValid)
        generalErrorMessge.style.display = "block";

    // seat error messgae
    if (!isSeatValid) 
        seatErrorMessge.style.display = "block";

    // security error message
    if (!isSecurityConsent)
        securityErrorMessage.style.display = "block";
}