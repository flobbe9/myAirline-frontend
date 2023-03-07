import React, { useEffect, useState } from "react";
import "./SearchFlight.css";
import moment from "moment";
import { addEventListenerForClass, addEventListenerForDocumentExcludeClass, toggleColorOnclick } from "../../helperMethods/events/events.ts";
import { Airport } from "../../mockdata/Airport.ts";
import { mockAirports } from "../../mockdata/MockData.ts";
import { Link } from "react-router-dom";


export default function SearchFlight(props) {

    return (
        <div className="SearchFlight">
            <h1 id="heading">Find your flight</h1><br />

            <TextInput name="From" />

            <TextInput name="To" />

            <OtherInput name="Date" defaultValue={moment().format("YYYY-MM-DD")} />

            <OtherInput name="Time" defaultValue={getTimeNowFormatted()} />

            <Submit to="/searchResult" />
        </div>
    )
};


function TextInput(props) {

    const [searchFlightItemDropDown, setSearchFlightItemDropDown]: [JSX.Element[], (dropDowns) => void] = useState();

    const className = "SearchFlight";
    const name = props.name;

    useEffect(() => {
        // hide dropDown onclick outside
        addEventListenerForDocumentExcludeClass(searchFlightItems, "mousedown", (i: number) => {
            (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";});

        // hide dropDown onclick on search result also
        addEventListenerForClass(searchFlightItemDropDowns, "click", (i: number) => {
            (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";});
    });

    return (
        <>
            <label className={className + "-label"} htmlFor={name}>{name}</label>
            <div className={className}>
                {/* Text input */}
                <input 
                    id={name + "-input"}
                    data-testid={name + "-input"} 
                    className={className + "-input"}
                    type="text" 
                    name={name} 
                    onKeyUp={() => handleKeyUp(name, setSearchFlightItemDropDown)}
                    autoComplete="off" />

                {/* DropDown */}
                <div 
                    id={name + "-dropDown"} 
                    data-testid={name + "-dropDown"} 
                    className={className + "-dropDown"}>
                    {searchFlightItemDropDown}
                </div>
            </div>
        </>)
}


function OtherInput(props) {
    
    const className = "SearchFlight";
    const name = props.name;

    return (
        <>
            <label className={className + "-label"} htmlFor={name}>{name}</label>
            <div className={className}>
                <input 
                    data-testid={name + "-input"}
                    className={className + "-input"}
                    name={name} 
                    type={name} 
                    defaultValue={props.defaultValue} />
            </div>
        </>)
}


function Submit(props) {
    // states
    const [errorMessage, setErrorMessage] = useState("Something went wrong.");
    const [isFormValid, setIsFormValid] = useState(false);

    const className = "SearchFlight";
    
    useEffect(() => {
        const submitButton = document.getElementById("SearchFlight-submit");
        
        // submit button changes color
        toggleColorOnclick(submitButton, "rgb(177, 177, 177)");
    })

    // show error message
    function handleClick() {
        try {
            isSearchFlightFormValid();
        } catch (error) {
            setErrorMessage(handleFalsyInput(error));
        }

        const errorDiv = document.getElementById("SearchFlight-errorMessage");
        if (errorDiv) errorDiv.style.display = "block";
    }

    // join input values to url params
    const urlParams: string = Array.from(searchFlightItemInputs).map(inputElement => (inputElement as HTMLInputElement).value)
                                                                .join("/");
    
    return (
        <div className={className} onMouseOver={() => {setIsFormValid(isSearchFlightFormValid())}} onClick={handleClick}>
            {/* Search button */}
            {isFormValid ? 
                <Link to={props.to + "/" + urlParams}>
                    <button id="SearchFlight-submit">Search</button>
                </Link> :
                <button id="SearchFlight-submit" type="submit">Search</button>}

            {/* Error message */}
            <div id="SearchFlight-errorMessage">{errorMessage}</div>       
        </div>
    );
}


const searchFlightItems = document.getElementsByClassName("SearchFlight");
const searchFlightItemInputs = document.getElementsByClassName("SearchFlight-input");
const searchFlightItemDropDowns = document.getElementsByClassName("SearchFlight-dropDown");

    
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
        (<div className="SearchFlight-dropDown-item" onMouseDown={() => {(inputElement as HTMLInputElement).value = airport.name}}>
            {airport.name}
        </div>)
    );
}


function handleKeyUp(name, setSearchFlightItemDropDown) {
    const inputField = document.getElementById(name + "-input");
    const dropDown = document.getElementById(name + "-dropDown");

    if (inputField && dropDown) {
        if (getAirportMatchesAsDiv(inputField).length !== 0) {
            dropDown.style.display = "block";
            setSearchFlightItemDropDown(getAirportMatchesAsDiv(inputField));

        } else 
            dropDown.style.display = "none";
    }
}


/**
 * Formates the current time using only houres and minutes. 
 * Ensures that both have two digets (e.g 09:23 instead of 9:23 or 23:04 instead of 23:4).
 * 
 * @returns a string with the current time.
 */
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
            if (!(/^[A-Za-züäö ]+$/.test(inputValue.trim()))) 
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