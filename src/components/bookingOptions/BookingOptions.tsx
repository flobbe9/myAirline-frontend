import React, { useEffect } from "react";
import "./BookingOptions.css";
import { SelectSeat } from "./SelectSeat";
import FlightDetails from "./FlightDetails";
import SelectLuggage from "./SelectLuggage";
import { toggleColorOnclick } from "../../utils/events/events";
import { useNavigate, useParams } from "react-router-dom";
import sendHttpRequest from "../../utils/fetch/fetch";


export default function BookingOptions(props) {

    const navigate = useNavigate();
    const params = useParams();
    const className = "BookingOptions";
    
    useEffect(() => {
        // toggle button color
        const submitButton = document.getElementById(className + "-submit");
        toggleColorOnclick(submitButton, "rgb(230, 230, 230)");
    }, [])

    function handleBook() {

        const securityCheckBox = document.getElementById("SelectLuggage-security-checkBox")
        const securityErrorMessage = document.getElementById("SelectLuggage-error-message");

        if ((securityCheckBox as HTMLInputElement).checked) {
            // send booking request
            fetchBook("http://localhost:4001/flight/book", params, navigate);

        } else
            securityErrorMessage!.style.display = "block";
    }

    return (
        <div className={className}>
            <h1>Booking options</h1>

            <div className={className + "-container"}>
                <SelectSeat className="SelectSeat"/>

                {/* <SelectFlightClass className="SelectFlightClass" /> */}

                <SelectLuggage className="SelectLuggage"/> 

                <FlightDetails className="FlightDetails"/>

                <button id={className + "-submit"} onClick={handleBook}>Book now</button>
            </div>
        </div>
    )
}


async function fetchBook(url: string, params, navigate) {

    // get luggage choice
    const luggageCheckBoxes = document.getElementsByClassName("SelectLuggage-luggageType-checkBox");
    const luggageFee = ((luggageCheckBoxes[0] as HTMLInputElement).checked) ? 0 : luggagePrice;

    const body = {
        id: params.id,
        seatType: getSeatType(),
        luggageFee: luggageFee,
        flightClass: "ECONOMY"
    }

    // book
    return await sendHttpRequest(url, "post", body)
        .then(jsonResponse => {
            if (jsonResponse.id == params.id) {
                alert("Booking complete.")
                navigate("/");

            } else 
                alert(jsonResponse.message);
        });
}


function getSeatType(): string {

    const seatTypeRadioButtons = document.getElementsByClassName("SelectSeat-radioButton");
    let seatType = "";

    Array.from(seatTypeRadioButtons).forEach(button => {
        const radioButton = (button as HTMLInputElement);

        if (radioButton.checked)
            seatType = radioButton.value;
    });
    
    if (seatType === "Window seat")
        return "WINDOW";

    if (seatType === "Corridor seat")
        return "CORRIDOR";

    if (seatType === "Foot room")
        return "FOOT_ROOM"; 

    return "NORMAL"
}


export const seatPrice = 5;
export const luggagePrice = 35; 
export const businessClassPrice = 30;
export const firstClassPrice = 50;