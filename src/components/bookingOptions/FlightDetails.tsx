import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import { useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch";
import { addEventListenerForClass } from "../../helperMethods/events/events";


export function FlightDetails(props) {

    const [flightDetails, setFlightDetails] = useState(initialFlightDetails);

    const [seatFee, setSeatFee] = useState("");
    const [luggageFee, setLuggageFee] = useState("");
    const [totalPrice, setTotalPrice] = useState(34);
    
    const [seatType, setSeatType] = useState("Random seat");
    const [luggageTypes, setLuggageTypes]: [JSX.Element[], (dropDowns) => void] = useState();
    const [breaks, setBreaks]: [JSX.Element[], (dropDowns) => void] = useState([])
    
    const basePrice = 34; // replace with flightDetails...
    const seatPrice = 5; // replace with flightDetails...
    const luggagePrice = 35; // replace with flightDetails...

    const flightId = useParams().id;
    const className = props.className;

    useEffect(() => {
        // fetch flight details
        if (flightDetails === initialFlightDetails) 
            fetchFlightDetails(flightId, setFlightDetails);
    }, []);
        
    useEffect(() => {
        // toggle seat and luggage details
        handleClickSeat(setSeatType, setSeatFee, setTotalPrice, totalPrice, seatPrice);
        handleClickLuggage(setLuggageFee, setTotalPrice, setLuggageTypes, totalPrice, luggagePrice, className, setBreaks);

    }, [totalPrice]);

    return (
        <div className={className}>
            <div id={className + "-heading"}>Details</div>
            <hr />

            {/* Departure */}
            <FlightDetailsItem className={className}
                flightDetails={flightDetails} 
                name="departure" 
                textAlign="left"
                other="WizzAir"/>

            {/* Arrival */} 
            <FlightDetailsItem className={className}
                flightDetails={flightDetails} 
                name="arrival" 
                textAlign="right"
                other={basePrice + "€"} />

            {/* Airline + base price */}
            <br /><hr />

            {/* Seat */}
            <PrefereceDetailsItem className={className} name="Seat" type={seatType} fee={seatFee} />
            <hr />

            {/* Luggage */}
            <PrefereceDetailsItem className={className} name="Luggage" type={luggageTypes} fee={luggageFee} breaks={breaks} />
            <hr />

            {/* Total */}
            <PrefereceDetailsItem className={className} name="Total" fee={totalPrice + "€"}/>
        </div>
    )
}


function FlightDetailsItem(props) {

    const className = props.className;
    const flightDetails = props.flightDetails;
    const name = props.name;
    const otherColor = name === "departure" ? "pink" : "greenyellow";

    return (
        <div className={className + "-" + props.textAlign}>
            {/* City */}
            <div style={{fontSize:"23px"}}>
                {flightDetails[name + "Airport"]}

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
        </div>
    )
}


function PrefereceDetailsItem(props) {

    const className = props.className;
    const name = props.name;

    return (
        <div className={className + "-container"}>
            <div className={className + "-center"}>{name}</div>

            <div className={className + "-left"}>{props.type}</div>
            {props.breaks}
            <div className={className + "-right"} style={{color:"greenyellow"}}>{props.fee}</div>
            <br />
        </div>)
}


async function fetchFlightDetails(flightId, setFlightDetails) {

    // set flightDetails on resolve
    return await sendHttpRequest("http://localhost:4001/flight/details/" + flightId, "post", "application/json")
                .then(jsonResponse => setFlightDetails(jsonResponse));
}


function handleClickSeat(setSeatType, setSeatFee, setTotalPrice, totalPrice, seatPrice) {
        
    const radioButtons = document.getElementsByClassName("SelectSeat-radioButton");
    
    // toggle seat fee and seat type
    addEventListenerForClass(radioButtons, "mousedown", (i: number, event) => {
        // null check
        if (!event) return;
        
        const seatType = (event.target as HTMLInputElement).value;
        const randomSeatElement = radioButtons[0];
        const isRandomSeatChecked = (randomSeatElement as HTMLInputElement).checked;

        // hide fee and type
        if (event.target === randomSeatElement) {
            if (!isRandomSeatChecked) {
                setSeatFee("");
                setTotalPrice(totalPrice - seatPrice);
            }
        
        // show fee and type
        } else {
            if (isRandomSeatChecked) {
                setSeatFee("+ " + seatPrice + "€");
                setTotalPrice(totalPrice + seatPrice);
            }
        }

        // set type
        setSeatType(seatType);
    });
}


function handleClickLuggage(setLuggageFee, setTotalPrice, setLuggageTypes, totalPrice, luggagePrice, className, setBreaks) {

    const checkBoxes = document.getElementsByClassName("SelectLuggage-luggageType-checkBox");
    
    // toggle luggage fee
    addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
        // null check
        if (!event) return;

        const cabbinLuggageElement = checkBoxes[0];
        
        // hide fee 
        if (event.target !== cabbinLuggageElement) {
            if (!(event.target as HTMLInputElement).checked) {
                setLuggageFee("");
                setTotalPrice(totalPrice - luggagePrice);
            
            // show fee 
            } else {
                setLuggageFee("+ " + luggagePrice + "€");
                setTotalPrice(totalPrice + luggagePrice)
            }
        }
    });

    // toggle luggage type
    addEventListenerForClass(checkBoxes, "click", (i: number) => {
        // iterate luggage elements
        setLuggageTypes(Array.from(checkBoxes).map(box => {
            // parse
            const checkBox = (box as HTMLInputElement);

            // show checked luggage elements
            return checkBox.checked ? 
                <div id={className + "-luggageType"} className={className + "-details"}>{checkBox.name}</div> :
                <></>
        }));

        // itarate luggage elements
        setBreaks(Array.from(checkBoxes).map(checkBox => 
                                            // add a break for every element 
                                            (checkBox as HTMLInputElement).checked? <br/> : <></>)
                                        // remove one break
                                        .pop());
    })
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