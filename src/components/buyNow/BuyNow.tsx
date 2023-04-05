import React, { useEffect, useState } from "react";
import "./BuyNow.css";
import "./FlightDetails.css";
import { setTitle, toggleColorOnclick } from "../../utils/events/events";
import sendHttpRequest from "../../utils/fetch/fetch";
import { initialFlightDetails } from "../bookingOptions/FlightDetails";
import { useParams } from "react-router-dom";


/**
 * Final page of booking process summarizing flight details, user data and paying method.
 * Currently not in use!!
 * 
 * @param props 
 * @returns 
 */
export default function BuyNow(props) {

    const [flightDetails, setFlightDetails] = useState(initialFlightDetails);
    const flightId = useParams().id;
    const className = "BuyNow";

    // TODO: remove these later
    const firstName = "Florin";
    const surName = "Schikarksi";
    const email = "florin735@live.com";

    // TODO: remove these later
    const seatFee = 5;
    const luggageFee = 35;
    const totalPrice = 80;
    const breaks = [<br />, <br />];

    useEffect(() => {
        setTitle("myAirline | Buy now")
        // fetch flight details
        if (flightDetails === initialFlightDetails) 
            fetchFlightDetails(flightId, setFlightDetails);

        // toggle button color
        const submitButton = document.getElementById(className + "-submit");
        toggleColorOnclick(submitButton, "rgb(230, 230, 230)");
    })

    function handleSubmit() {
        alert("Booking complete") // TODO: remove later

        book("http://localhost:4001/flight/book");
    }

    return (
        <div className={className}>
            <h1>Overview</h1>

            <div className={className + "-container"}>

                {/* User details */}
                <div className={className + "-userDetails"}>
                    <div style={{listStyle:"none"}}>
                        {firstName + " " + surName}
                        <br />
                        {email}
                    </div>
                </div>

                <div className={className + "-flightDetails"}>
                    {/* Departure */}
                    <FlightDetailsItem className={className + "-flightDetails"}
                        flightDetails={flightDetails} 
                        name="departure" 
                        textAlign="left"
                        other="WizzAir"/>

                    {/* Arrival */} 
                    <FlightDetailsItem className={className + "-flightDetails"}
                        flightDetails={flightDetails} 
                        name="arrival" 
                        textAlign="right"
                        other={flightDetails.basePrice + "€"} />

                    {/* Seat */}
                    <PrefereceDetailsItem className={className} name="Seat" type={"seatType"} fee={seatFee} />
                    <hr />

                    {/* Luggage */}
                    <PrefereceDetailsItem className={className} name="Luggage" type={"luggageTypes"} fee={luggageFee} breaks={breaks} />
                    <hr />

                    {/* Total */}
                    <PrefereceDetailsItem className={className} name="Total" fee={totalPrice + "€"}/>
                </div>
                <br />

                <button id={className + "-submit"} onClick={handleSubmit}>Buy now</button>
            </div>
        </div>)
}


function FlightDetailsItem(props) {

    const className = props.className;
    const flightDetails = props.flightDetails;
    const name = props.name;
    const otherColor = name === "departure" ? "pink" : "rgba(22, 22, 252, 0.685)";

    return (
        <div className={className + "-" + props.textAlign}>
            {/* City */}
            <div style={{fontSize:"23px"}}>
                {flightDetails[name + "AirportName"]}

                {(name === "departure") ? 
                    <div className={className + "-arrow"}>{" -> "}</div> : 
                    <></>}
            </div>
            <br /><br />

            {/* Time */}
            <div>{flightDetails[name + "Time"]}</div>
            
            {/* Date */}
            <div>{flightDetails[name + "Date"]}</div>
            <br />

            {/* Other */}
            <div style={{color:otherColor}}>{props.other}</div>
            <hr />
        </div>)
}


function PrefereceDetailsItem(props) {

    const className = props.className;
    const name = props.name;

    return (
        <div className={className + "-container"}>
            <div className={className + "-center"}>{name}</div>

            {/* Type */}
            <div className={className + "-left"}>{props.type}</div>

            {props.breaks}

            {/* Fee */}
            <div className={className + "-right"} style={{color:"rgba(22, 22, 252, 0.685)"}}>{props.fee}</div>
            <br />
        </div>)
}


async function fetchFlightDetails(flightId, setFlightDetails) {

    // set flightDetails on resolve
    return await sendHttpRequest("http://localhost:4001/flight/getById/" + flightId, "get")
        .then(jsonResponse => setFlightDetails(jsonResponse));
}


async function book(url) {

}