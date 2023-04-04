import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import { useParams } from "react-router-dom";
import { addEventListenerForClass } from "../../utils/events/events";
import { luggagePrice, seatPrice } from "./BookingOptions";
import sendHttpRequest from "../../utils/fetch/fetch";


export default function FlightDetails(props) {
    
    const [flightDetails, setFlightDetails]: [FlightDetailsWrapper, (flightDetailsWrapper) => void] = useState(initialFlightDetails);
   
    const [seatFee, setSeatFee] = useState("");
    const [luggageFee, setLuggageFee] = useState("");

    const [totalPrice, setTotalPrice] = useState(0);
    
    const [seatType, setSeatType] = useState("Random seat");
    const [luggageTypes, setLuggageTypes]: [JSX.Element[], (dropDowns) => void] = useState();
    const [breaks, setBreaks]: [JSX.Element[], (dropDowns) => void] = useState([])
    
    const flightId = useParams().id;
    const className = props.className;

    useEffect(() => {
        // fetch flight details
        if (flightDetails === initialFlightDetails)
            fetchFlightDetails(flightId, setFlightDetails, setTotalPrice);
        
        // toggle seat and luggage details
        handleClickRadio(setSeatType, setSeatFee, setTotalPrice, totalPrice, seatPrice, "SelectSeat-radioButton");
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

            {/* FlightClass */}
            {/* <PrefereceDetailsItem className={className} name="Flight class" type={flightClassType} fee={flightClassFee} breaks={breaks} /> */}
            {/* <hr /> */}

            {/* Total */}
            <PrefereceDetailsItem className={className} name="Total" fee={totalPrice + "€"}/>
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


export function handleClickRadio(setType, setFee, setTotalPrice, totalPrice, fee, buttonsClassName, secondFee?) {
        
    const radioButtons = document.getElementsByClassName(buttonsClassName);

    // toggle seat fee and seat type
    addEventListenerForClass(radioButtons, "mousedown", (i: number, event) => {
        const targetElement = (event!.target as HTMLInputElement);
        const type = targetElement.value;
        const firstElement = (radioButtons[0] as HTMLInputElement);

        if (type === "First")
            fee = secondFee;

        // hide fee and type    
        if (targetElement === firstElement) {
            if (!(targetElement.checked)) {
                setFee("");
                setTotalPrice(totalPrice - fee);
            }
        
        // show fee and type
        } else {
            if (!targetElement.checked && firstElement.checked) {
                setFee("+ " + fee + "€");
                setTotalPrice(totalPrice + fee);
            } 
        }

        // set type
        setType(type);

        
    });
}


function handleClickLuggage(setLuggageFee, setTotalPrice, setLuggageTypes, totalPrice, luggagePrice, className, setBreaks) {

    const checkBoxes = document.getElementsByClassName("SelectLuggage-luggageType-checkBox");
    
    addEventListenerForClass(checkBoxes, "click", (i: number, event) => {
        const targetElement = (event!.target as HTMLInputElement);
        const firstElement = checkBoxes[0];

        // display fees
        if (targetElement !== firstElement) {
            // hide fee 
            if (!targetElement.checked) {
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