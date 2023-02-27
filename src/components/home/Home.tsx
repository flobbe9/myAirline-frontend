import React, { useEffect, useState } from "react";

import "./Home.css";
import moment from "moment";
import { addEventListenerForClass, addEventListenerForDocumentExcludeClass, toggleColorOnclick } from "../../helperMethods/events/events";
import { Airport } from "../../mockdata/Airport";
import { mockAirports } from "../../mockdata/MockData";
import { Link } from "react-router-dom";


export default function Home(props) {
    return (
        <div className="Home">
            <div className="searchFlight-container">
                <h1 id="heading">Find your flight</h1><br />

                <SearchFlightInput name="From" className="searchFlight-item" />

                <SearchFlightInput name="To" className="searchFlight-item" />

                <label className="searchFlight-item-label" htmlFor="Date">Date</label>
                <div className="searchFlight-item">
                    <input 
                        data-testid="Date-input" 
                        className="searchFlight-item-input"
                        name="Date" 
                        type="date" 
                        defaultValue={moment().format("YYYY-MM-DD")} />
                </div>

                <label className="searchFlight-item-label" htmlFor="Time">Time</label>
                <div className="searchFlight-item">
                    <input 
                        data-testid="Time-input"
                        className="searchFlight-item-input" 
                        name="Time" 
                        type="time" 
                        defaultValue={getTimeNowFormatted()}/>
                </div>

                <SubmitLink className="searchFlight-item" to="/service" />
            </div>

            <div className="someOtherContent">
                <h2>Other content</h2>
            </div>
        </div>
    )
};


function SearchFlightInput(props) {
    // state
    const [searchFlightItemDropDown, setSearchFlightItemDropDown]: [JSX.Element[], (dropDowns) => void] = useState();

    useEffect(() => {
        // hide dropDown onclick outside
        addEventListenerForDocumentExcludeClass(searchFlightItems, "mousedown", (i: number) => {
            (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";
        });

        // hide dropDown onclick on search result also
        addEventListenerForClass(searchFlightItemDropDowns, "click", (i: number) => {
            (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";
        })
    });
    
    // show matching results
    function handleKeyUp() {
        const inputField = document.getElementById(props.name + "-input");
        const dropDown = document.getElementById(props.name + "-dropDown");

        if (inputField && dropDown) {
            if (getAirportMatchesAsDiv(inputField).length !== 0) {
                dropDown.style.display = "block";
                setSearchFlightItemDropDown(getAirportMatchesAsDiv(inputField));

            } else 
                dropDown.style.display = "none";
        }
    }

    return (
        <>
            <label className={props.className + "-label"} htmlFor={props.name}>{props.name}</label>
            <div className={props.className}>
                
                <input 
                    id={props.name + "-input"}
                    data-testid={props.name + "-input"} 
                    className={props.className + "-input"}
                    type="text" 
                    name={props.name} 
                    onKeyUp={() => handleKeyUp()}
                    autoComplete="off" />

                <div 
                    id={props.name + "-dropDown"} 
                    data-testid={props.name + "-dropDown"} 
                    className={props.className + "-dropDown"}>
                    {searchFlightItemDropDown}
                </div>
            </div>
        </>
    )
}


function SubmitLink(props) {
    // states
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went wrong.");

    useEffect(() => {
        // submit button changes color
        toggleColorOnclick(document.getElementById("searchFlight-item-submit"), "rgb(177, 177, 177)");
    })

    // show error message
    function handleClick() {
        try {
            isSearchFlightFormValid();
        } catch (error) {
            setErrorMessage(handleFalsyInput(error));
        }
        const errorDiv = document.getElementById("searchFlight-item-submit-errorMessage");
        if (errorDiv) errorDiv.style.display = "block";
    }

    // submit don't redirect if error
    const button = isValid? (<Link to={props.to}><button id="searchFlight-item-submit">Search</button></Link>) : 
                            (<button id="searchFlight-item-submit">Search</button>);
    
    return (
        <div className={props.className} onMouseOver={() => {setIsValid(isSearchFlightFormValid())}} onClick={() => handleClick()}>
            {button}
            <div id="searchFlight-item-submit-errorMessage">{errorMessage}</div>       
        </div>
    );
}


const searchFlightItems = document.getElementsByClassName("searchFlight-item");
const searchFlightItemInputs = document.getElementsByClassName("searchFlight-item-input");
const searchFlightItemDropDowns = document.getElementsByClassName("searchFlight-item-dropDown");

    
function getAirportMatches(inputText: string): Airport[] {
    // filter airports
    return mockAirports.filter(airport => airport.name.toLowerCase().includes(inputText.toLowerCase()));
}


function getAirportMatchesAsDiv(inputElement: HTMLElement | null): JSX.Element[] {
    if (!inputElement) 
        return [];
    
    let inputText = (inputElement as HTMLInputElement).value;
    if (!inputText) 
        return [];
    
    // wrap search results in div tags
    return getAirportMatches(inputText).map(airport => 
        (<div className="searchResult" onClick={() => {(inputElement as HTMLInputElement).value = airport.name;}}>
            {airport.name}
        </div>)
    );
}


function getTimeNowFormatted(): string {
    const today = new Date();
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();

    hours = hours.length === 1 ? "0" + hours : hours.toString();

    minutes = minutes.length === 1 ?"0" + minutes : minutes.toString();

    return hours + ":" + minutes;
}


function isSearchFlightFormValid(): boolean {
    // iterate all inputs
    Array.from(searchFlightItemInputs).forEach((inputElement) => {
        // parse to HTMLInputElement
        const input = (inputElement as HTMLInputElement);
        const inputType = input.type;
        const inputValue = input.value;

        // text input
        if (inputType === "text") {
            // only alphabetical chars
            if (!(/^[A-Za-z ]+$/.test(inputValue.trim()))) 
                throw Error("text");
            
        // date input
        } else if (inputType === "date") {
            if (!isDateInputValid(inputValue)) 
                throw Error("date");
        }
    });

    return true;
}


function isDateInputValid(input: string): boolean {
    // convert to Date
    let dateInput: Date;
    try {
        dateInput = new Date(input);
    } catch (error) {
        alert(error);
        return false;
    }

    // get today without time
    const today = new Date();
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);

    // should not be in the past
    return dateInput >= today;
}


function handleFalsyInput(error: Error): string {
    // text input
    if (error.message === "text")
        return "Only alphabetical characters can be used for the cities!";

    if (error.message ===  "date")
        return "Date cannot be in the past!";

    return "Something wrong with the input!";
}


/**
 * TODO:
 * Replace submit link
 */