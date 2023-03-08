import React, { useEffect, useState } from "react";
import "./SearchFlight.css";
import moment from "moment";
import { addEventListenerForClass, addEventListenerForDocumentExcludeClass, toggleColorOnclick } from "../../helperMethods/events/events.ts";
import { mockAirports } from "../../mockdata/MockData.ts";
import { Link } from "react-router-dom";


// helpers out of component
// functionality
export default function SearchFlight(props) {

    const className = "SearchFlight";

    return (
        <div className={className}>
            <h1 id="heading">Find your flight</h1><br />

            <TextInput className={className} name="From" />

            <TextInput className={className} name="To" />

            <OtherInput className={className} name="Date" defaultValue={moment().format("YYYY-MM-DD")} />

            <OtherInput className={className} name="Time" defaultValue={getTimeNowFormatted()} />

            <Submit to="/searchResult" />
        </div>
    )
};


function TextInput(props) {

    const [searchFlightDropDown, setSearchFlightDropDown]: [JSX.Element[], (dropDowns) => void] = useState();

    const className = props.className;
    const name = props.name;

    useEffect(() => {
        const searchFlightItems = document.getElementsByClassName("SearchFlight");
        const searchFlightDropDowns = document.getElementsByClassName("SearchFlight-dropDown");

        // hide dropDown onclick outside
        addEventListenerForDocumentExcludeClass(searchFlightItems, "mousedown", (i: number) => {
            (searchFlightDropDowns[i] as HTMLElement).style.display = "none";});

        // hide dropDown onclick on search result also
        addEventListenerForClass(searchFlightDropDowns, "click", (i: number) => {
            (searchFlightDropDowns[i] as HTMLElement).style.display = "none";});
    });

    return (
        <div className={className}>
            <label className={className + "-label"} htmlFor={name}>{name}</label>
            <div className={className + "-container"}>
                {/* Text input */}
                <input id={name + "-input"}
                    data-testid={name + "-input"} 
                    className={className + "-input"}
                    type="text" 
                    name={name} 
                    onKeyUp={() => handleKeyUp(name, setSearchFlightDropDown)}
                    autoComplete="off" />

                {/* DropDown */}
                <div id={name + "-dropDown"} 
                    className={className + "-dropDown"}
                    data-testid={name + "-dropDown"}>

                    {searchFlightDropDown}
                </div>
            </div>
        </div>)
}


function OtherInput(props) {
    
    const className = props.className;
    const name = props.name;

    return (
        <div className={className}>
            <label className={className + "-label"} htmlFor={name}>{name}</label>
            <div className={className + "-container"}>
                <input className={className + "-input"}
                    data-testid={name + "-input"}
                    name={name} 
                    type={name} 
                    defaultValue={props.defaultValue} />
            </div>
        </div>)
}


function Submit(props) {
    
    const [errorMessage, setErrorMessage] = useState("Something went wrong.");
    const [isFormValid, setIsFormValid] = useState(false);

    const className = "SearchFlight";
    const searchFlightInputs = document.getElementsByClassName("SearchFlight-input");
    
    useEffect(() => {
        const submitButton = document.getElementById("SearchFlight-submit");
        
        // submit button changes color
        toggleColorOnclick(submitButton, "rgb(177, 177, 177)");
    })

    // join input values to url params
    const urlParams: string = Array.from(searchFlightInputs)
                                   .map(inputElement => (inputElement as HTMLInputElement).value)
                                   .join("/");
    
    return (
        <div className={className} 
            onMouseOver={() => {setIsFormValid(isSearchFlightFormValid(searchFlightInputs))}} 
            onClick={() => handleSubmit(searchFlightInputs, setErrorMessage)}>

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

    
function getAirportMatches(inputText: string): string[] {

    // filter airport names by first char
    return  mockAirports.map(airport => airport.name)
                        .filter(airportName => airportName.toLowerCase()
                                                          .startsWith(inputText.charAt(0)));
}


function getAirportMatchesAsDiv(inputElement: HTMLElement | null): JSX.Element[] {

    if (!inputElement) 
        return [];
    
    let inputText = (inputElement as HTMLInputElement).value;
    if (!inputText) 
        return [];

    // wrap search results in div tags
    return getAirportMatches(inputText).map(airport => (
                                        <div className="SearchFlight-dropDown-item" 
                                            onMouseDown={() => {(inputElement as HTMLInputElement).value = airport}}>
                                            {airport}
                                        </div>));
}


function handleSubmit(searchFlightInputs, setErrorMessage) {

    try {
        isSearchFlightFormValid(searchFlightInputs);
    } catch (error) {
        setErrorMessage(getErrorMessage(error));
    }

    const errorDiv = document.getElementById("SearchFlight-errorMessage");
    if (errorDiv) errorDiv.style.display = "block";
}


function handleKeyUp(name, setSearchFlightItemDropDown) {

    const inputElement = document.getElementById(name + "-input");
    const dropDown = document.getElementById(name + "-dropDown");

    if (inputElement && dropDown) {
        if (getAirportMatchesAsDiv(inputElement).length !== 0) {
            dropDown.style.display = "block";
            setSearchFlightItemDropDown(getAirportMatchesAsDiv(inputElement));

        } else 
            dropDown.style.display = "none";
    }
}


function isSearchFlightFormValid(searchFlightInputs): boolean {

    // iterate all inputs
    Array.from(searchFlightInputs).forEach((inputElement) => {
        // parse to HTMLInputElement
        const input = (inputElement as HTMLInputElement);
        const inputType = input.type;
        const inputValue = input.value;

        // text input
        if (inputType === "text") {
            // should not be empty
            if (inputValue.length === 0)
                throw Error("textEmpty");

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


function getErrorMessage(error: Error): string {

    const errorMessage = error.message;

    if (errorMessage === "text")
        return "Only alphabetical characters can be used for the cities!";

    if (errorMessage === "textEmpty")
        return "Please enter departure and destination city!"

    if (errorMessage ===  "date")
        return "Date cannot be in the past!";

    return "Something wrong with the input!";
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