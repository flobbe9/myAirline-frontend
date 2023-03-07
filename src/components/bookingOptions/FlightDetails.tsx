import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import { useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch";
import { addEventListenerForClass } from "../../helperMethods/events/events";


// TODO: clean this up
// move most functions out of component
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

    // fetch flight details
    useEffect(() => {
        async function fetchFlightDetails() {
            await sendHttpRequest("http://localhost:4001/flight/details/" + flightId, "post", "application/json")
                .then(jsonResponse => setFlightDetails(jsonResponse));
        }

        if (flightDetails === initialFlightDetails)
            fetchFlightDetails();

        }, []);
        
    // toggle price
    useEffect(() => {
        handleClickSeat();
        handleClickLuggage();
    }, [totalPrice, seatType]);
        
    function handleClickSeat() {
        
        const radioButtons = document.getElementsByClassName("SelectSeat-radioButton");
        const randomSeat = radioButtons[0];

        // set seat fee
        addEventListenerForClass(radioButtons, "mousedown", (i: number, event) => {
            if (event && event.target) {
                const seatType = getSeatTypeByNumber(((event.target as HTMLElement).id));

                if (event.target === randomSeat) {
                    if (!(randomSeat as HTMLInputElement).checked) {
                        setSeatType(seatType);
                        setSeatFee("");
                        setTotalPrice(totalPrice - seatPrice);
                    }
                    
                } else if ((randomSeat as HTMLInputElement).checked) {
                    setSeatType(seatType);
                    setSeatFee("+ " + seatPrice + "€");
                    setTotalPrice(totalPrice + seatPrice);
                }
                setSeatType(seatType);
            }
        });
    }

    function handleClickLuggage() {

        const checkBoxes = document.getElementsByClassName("SelectLuggage-luggageType-checkBox");

        // set luggage fee 
        addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
            if (!event) return;
            
            if (event.target !== checkBoxes[0]) {
                if (!(event.target as HTMLInputElement).checked) {
                    setLuggageFee("");
                    setTotalPrice(totalPrice - luggagePrice);

                } else {
                    setLuggageFee("+ " + luggagePrice + "€");
                    setTotalPrice(totalPrice + luggagePrice)
                }
            }
        });

        addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
            setLuggageElements(Array.from(checkBoxes).map(checkBox => {
                if ((checkBox as HTMLInputElement).checked)
                    return <div id={className + "-luggageType"} className={className + "-details"}>{(checkBox as HTMLInputElement).name}</div>
            }));
        })
    }
        

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