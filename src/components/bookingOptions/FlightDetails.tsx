import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import { useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch";
import { addEventListenerForClass } from "../../helperMethods/events/events";


// TODO: clean this up
// reconsider naming
// try to reduce number of states
export function FlightDetails(props) {

    // state
    const [flightDetails, setFlightDetails] = useState(initialFlightDetails);
    const [seatFee, setSeatFee] = useState("");
    const [seatType, setSeatType] = useState(getSeatTypeByNumber("0"));
    const [luggageElements, setLuggageElements]: [JSX.Element[], (dropDowns) => void] = useState();
    const [luggageFee, setLuggageFee] = useState("");
    const basePrice = 34;
    const [totalPrice, setTotalPrice] = useState(basePrice);
    const seatPrice = 5;
    const luggagePrice = 35;

    const flightId = useParams().id;

    const className = props.className;

    useEffect(() => {
        // fetch flight details
        if (flightDetails === initialFlightDetails) 
            fetchFlightDetails(flightId, setFlightDetails);
    }, []);
        
    useEffect(() => {
        // toggle price
        handleClickSeat(setSeatType, setSeatFee, setTotalPrice, totalPrice, seatPrice);
        handleClickLuggage(setLuggageFee, setTotalPrice, setLuggageElements, totalPrice, luggagePrice, className);
    }, [totalPrice, seatType]);
        

    return (
        <div className={className}>
            <div className={className + "-heading"}>Details</div>
            <hr />

            {/* Departure */}
            <FlightDetailsItem 
                className={className}
                flightDetails={flightDetails} 
                name="departure" 
                child={<div className={className + "-airline"}>WizzAir</div>}/>

            {/* Arrival */} 
            <FlightDetailsItem 
                className={className}
                flightDetails={flightDetails} 
                name="arrival" 
                child={<div className={className + "-price"}>{basePrice}€</div>} />
            <hr />

            {/* TODO: make sections a component */}
            Seat
            <section style={{textAlign:"left"}}>
                <div id={className + "-seatType"} className={className + "-details"}>{seatType}</div>
                <div id={className + "-seatFee"} className={className + "-price"}>{seatFee}</div>
            </section>
            <hr />

            Luggage
            <section style={{textAlign:"left"}}>
                {luggageElements}
                <div id={className + "-luggageFee"} className={className + "-price"}>{luggageFee}</div>
            </section>
            <hr />

            <section>
                Total
                <div id={className + "-totalPrice"} className={className + "-price"}>{totalPrice}€</div>
            </section>
        </div>
    )
}


function FlightDetailsItem(props) {

    const className = props.className;
    const flightDetails = props.flightDetails;
    const name = props.name;

    return (
        <section className={className + "-" + name}>
            <div>
                {/* City */}
                {flightDetails[name + "Airport"]}
                {/* Arrow (?) */}
                {(name === "departure") ? 
                    <div className={className + "-arrow"}>{" -> "}</div> : 
                    <></>}
            </div>
            <br />

            {/* Time */}
            <div className={className + "-details"}>{flightDetails[name + "Time"]}</div>
            {/* Date */}
            <div className={className + "-details"}>{flightDetails[name + "Date"]}</div>
            <br />

            {/* Child */}
            {props.child}
        </section>
    )
}


export function isFlightDetailsValid(): boolean {

    // check price

    return true;
}


async function fetchFlightDetails(flightId, setFlightDetails) {

    // set flight details on resolve
    await sendHttpRequest("http://localhost:4001/flight/details/" + flightId, "post", "application/json")
         .then(jsonResponse => setFlightDetails(jsonResponse));
}


function handleClickSeat(setSeatType, setSeatFee, setTotalPrice, totalPrice, seatPrice) {
        
    const radioButtons = document.getElementsByClassName("SelectSeat-radioButton");
    const randomSeat = radioButtons[0];

    // seat fee and seat type
    addEventListenerForClass(radioButtons, "mousedown", (i: number, event) => {
        if (!event) return;

        const seatType = getSeatTypeByNumber(((event.target as HTMLElement).id));

        // hide seat fee and seat type
        if (event.target === randomSeat) {
            if (!(randomSeat as HTMLInputElement).checked) {
                setSeatType(seatType);
                setSeatFee("");
                setTotalPrice(totalPrice - seatPrice);
            }
        
        // show seat fee and seat type
        } else if ((randomSeat as HTMLInputElement).checked) {
            setSeatType(seatType);
            setSeatFee("+ " + seatPrice + "€");
            setTotalPrice(totalPrice + seatPrice);
        }

        // set selected seat type
        setSeatType(seatType);
    });
}


function handleClickLuggage(setLuggageFee, setTotalPrice, setLuggageElements, totalPrice, luggagePrice, className) {

    const checkBoxes = document.getElementsByClassName("SelectLuggage-luggageType-checkBox");

    // luggage fee
    addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
        if (!event) return;
        
        // hide luggage fee 
        if (event.target !== checkBoxes[0]) {
            if (!(event.target as HTMLInputElement).checked) {
                setLuggageFee("");
                setTotalPrice(totalPrice - luggagePrice);
            
            // show luggage fee 
            } else {
                setLuggageFee("+ " + luggagePrice + "€");
                setTotalPrice(totalPrice + luggagePrice)
            }
        }
    });

    // luggage type
    addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
        // iterate luggage elements
        setLuggageElements(Array.from(checkBoxes).map(checkBox => {
            // show checked luggage elements
            if ((checkBox as HTMLInputElement).checked)
                return <div id={className + "-luggageType"} className={className + "-details"}>{(checkBox as HTMLInputElement).name}</div>
        }));
    })
}


function getSeatTypeByNumber(num: string): string {

    switch(num) {
        case "0": 
            return "Random seat";
        case "1": 
            return "Window seat";
        case "2":
            return "Corridor seat";
        case "3": 
            return "FootRoom seat";
        default:
            return "No seat selected"
    }
}


interface FlightDetailsWrapper {
    departureAirport;
    arrivalAirport;
    departureDate;
    arrivalDate;
    departureTime;
    arrivalTime;
    id;
}


const initialFlightDetails: FlightDetailsWrapper = {
    departureAirport: undefined,
    arrivalAirport: undefined,
    departureDate: undefined,
    arrivalDate: undefined,
    departureTime: undefined,
    arrivalTime: undefined,
    id: undefined
}