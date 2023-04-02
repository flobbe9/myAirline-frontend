import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import { useParams } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch";
import { addEventListenerForClass } from "../../helperMethods/events/events";
import { luggagePrice, seatPrice } from "./BookingOptions";


export default function FlightDetails(props) {

    const [flightDetails, setFlightDetails]: [FlightDetailsWrapper, (flightDetailsWrapper) => void] = useState(initialFlightDetails);
    const [seatFee, setSeatFee] = useState("");
    const [luggageFee, setLuggageFee] = useState("");
    const [flightClassFee, setFlightClassFee] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);
    
    const [seatType, setSeatType] = useState("Random seat");
    const [luggageTypes, setLuggageTypes]: [JSX.Element[], (dropDowns) => void] = useState();
    const [breaks, setBreaks]: [JSX.Element[], (dropDowns) => void] = useState([])
    
    const flightId = useParams().id;
    const className = props.className;

    useEffect(() => {
        if (flightDetails === initialFlightDetails) {
            // fetch flight details
            fetchFlightDetails(flightId, setFlightDetails, setTotalPrice);
        }

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
                other={flightDetails.basePrice + "€"} />

            {/* Seat */}
            <PrefereceDetailsItem className={className} name="Seat" type={seatType} fee={seatFee} />
            <hr />

            {/* Luggage */}
            <PrefereceDetailsItem className={className} name="Luggage" type={luggageTypes} fee={luggageFee} breaks={breaks} />
            <hr />

            {/* Total */}
            <PrefereceDetailsItem className={className} name="Total" fee={totalPrice + "€"}/>
        </div>)
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
            <div className={className + "-right"} style={{color:"greenyellow"}}>{props.fee}</div>
            <br />
        </div>)
}


async function fetchFlightDetails(flightId, setFlightDetails, setTotalPrice) {

    // set flightDetails on resolve
    return await sendHttpRequest("http://localhost:4001/flight/getById/" + flightId, "get")
        .then(jsonResponse => {
            setFlightDetails({
                id: jsonResponse.id,
                departureAirportName: jsonResponse.departureAirportName,
                arrivalAirportName: jsonResponse.arrivalAirportName,
                departureDate: jsonResponse.departureDate,
                arrivalDate: jsonResponse.arrivalDate,
                departureTime: jsonResponse.departureTime,
                arrivalTime: jsonResponse.arrivalTime,
                basePrice: jsonResponse.basePrice
            });

            setTotalPrice(jsonResponse.basePrice);
        });
}


function handleClickSeat(setSeatType, setSeatFee, setTotalPrice, totalPrice, seatPrice) {
        
    const radioButtons = document.getElementsByClassName("SelectSeat-radioButton");

    // toggle seat fee and seat type
    addEventListenerForClass(radioButtons, "mousedown", (i: number, event) => {
        const seatType = (event!.target as HTMLInputElement).value;
        const randomSeatElement = radioButtons[0];
        const isRandomSeatChecked = (randomSeatElement as HTMLInputElement).checked;

        // hide fee and type    
        if (event!.target === randomSeatElement) {
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
    
    addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
        // display fees
        if (event!.target !== checkBoxes[0]) {
            // hide fee 
            if (!(event!.target as HTMLInputElement).checked) {
                setLuggageFee("");
                setTotalPrice(totalPrice - luggagePrice);
            
            // show fee 
            } else {
                setLuggageFee("+ " + luggagePrice + "€");
                setTotalPrice(totalPrice + luggagePrice)
            }
        }

        // display type
        setLuggageTypes(Array.from(checkBoxes).map(box => {
            // parse
            const checkBox = (box as HTMLInputElement);

            // show checked luggage elements
            return checkBox.checked ? 
                <div id={className + "-luggageType"} className={className + "-details"}>{checkBox.name}</div> :
                <></>
        }));

        // set breaks
        setBreaks(countBreaks(checkBoxes));
    });
}


function countBreaks(checkBoxes): JSX.Element[] {

    const breaks: JSX.Element[] = [];

    Array.from(checkBoxes).forEach(checkBox => {
        if((checkBox as HTMLInputElement).checked) 
            breaks.push(<br />);
    })
    breaks.pop();

    return breaks;
}


export interface FlightDetailsWrapper {
    id: number
    departureAirportName: string
    arrivalAirportName: string
    departureDate: string
    arrivalDate: string
    departureTime: string
    arrivalTime:string
    basePrice: number
}


export const initialFlightDetails: FlightDetailsWrapper = {
    id: 0,
    departureAirportName: "",
    arrivalAirportName: "",
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
    basePrice: 0
}