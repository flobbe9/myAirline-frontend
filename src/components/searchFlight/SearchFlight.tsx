import React, { useEffect, useState } from "react";
import "./SearchFlight.css";
import moment from "moment";
import { addEventListenerForDocumentExcludeClass, toggleColorOnclick } from "../../utils/events/events.ts";
import { useNavigate } from "react-router-dom";
import { Airport } from "../../interfaces/Airport.ts";
import sendHttpRequest from "../../utils/fetch/fetch.ts";


/**
 * Root page to search flights. 
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
export default function SearchFlight(props) {

    const [airports, setAirports]: [Airport[], (airports) => void] = useState([]);
    const navigate = useNavigate();
    const className = "SearchFlight";
    const todayFormatted = moment().format("YYYY-MM-DD");

    useEffect(() => {
        window.scroll(0, 0);

        const submitButton = document.getElementById("SearchFlight-submit");
        
        // submit button changes color
        toggleColorOnclick(submitButton, "rgb(230, 230, 230)");

        // fetch airports
        if (airports.length === 0)
            fetchAirports("http://localhost:4001/airport/getAll", setAirports);
    }, [airports.length])

    function handleSubmit(event) {
        
        event.preventDefault();
        
        const form = document.getElementById(className + "-container");

        if ((form as HTMLFormElement).checkValidity())
            navigate("/searchResult/" + inputValuesToParams());
    }

    return (
        <div className={className}>
            <h1 id="heading">Find your flight</h1>
            <br /><br /><br /><br />

            <form id={className + "-container"} onSubmit={handleSubmit}>
                <TextInput id="From" className={className} airports={airports} />

                <TextInput id="To" className={className} airports={airports} />

                <OtherInput id="Date" 
                    className={className} 
                    defaultValue={todayFormatted} 
                    min={todayFormatted}
                    errorMessage="Date cannot be in the past." />

                <OtherInput id="Time" className={className} defaultValue={getTimeNowFormatted()} />

                <div style={{display: "inline-block"}}>
                    <button id="SearchFlight-submit" type="submit">Search</button>
                </div>
            </form>
        </div>
    )
};


function TextInput(props) {

    const [searchFlightDropDown, setSearchFlightDropDown]: [JSX.Element[], (dropDowns) => void] = useState();

    const className = props.className;
    const id = props.id;

    useEffect(() => {
        const searchFlightItems = document.getElementsByClassName("SearchFlight-input");
        const searchFlightDropDowns = document.getElementsByClassName("SearchFlight-dropDown");

        // hide dropDown onclick outside
        addEventListenerForDocumentExcludeClass(searchFlightItems, "mousedown", (i: number) => {
            (searchFlightDropDowns[i] as HTMLElement).style.display = "none";});
    });

    return (
        <div className={className + "-TextInput"}>
            <label className={className + "-label"}>{id}</label>
            <div className={className + "-item"}>
                {/* Text input */}
                <input id={id + "-input"}
                    className={className + "-input"}
                    type="text" 
                    onKeyUp={() => handleKeyUp(id, setSearchFlightDropDown, props.airports)}
                    autoComplete="off" 
                    required 
                    onInvalid={event => handleInvalid(event, id + "-input")}
                    onInput={event => (event.target as HTMLSelectElement).setCustomValidity("")} />

                {/* DropDown */}
                <div id={id + "-dropDown"} className={className + "-dropDown"}>
                    {searchFlightDropDown}
                </div>
            </div>
        </div>)
}


function OtherInput(props) {
    
    const className = props.className;
    const id = props.id;

    return (
        <div className={className + "-OtherInput"}>
            <label className={className + "-label"}>{id}</label>
            <div className={className + "-item"}>
                <input id={id + "-input"}
                    className={className + "-input"}
                    type={id} 
                    defaultValue={props.defaultValue}
                    onInvalid={event => handleInvalid(event, id + "-input", props.errorMessage)}
                    onInput={event => (event.target as HTMLSelectElement).setCustomValidity("")}
                    min={props.min}
                    required />
            </div>
        </div>)
}


function handleInvalid(event, id, message?): void {

    const inputElement = document.getElementById(id);

    ((inputElement as HTMLInputElement).value === "") ?
        // emtpy input
        event.target.setCustomValidity("Please fill out this field.") :
        // any other case
        event.target.setCustomValidity(message);
}


/**
 * Filters all airports that start with the same letter (to lowercase) as the user input.
 * 
 * @param inputText user input
 * @param airports array of available airports
 * @returns array of airports matching with the input
 */
function getAirportMatches(inputText: string, airports): string[] {

    // filter airport names by first char
    return  airports.map(airport => airport.name)
                        .filter(airportName => airportName.toLowerCase()
                                                          .startsWith(inputText.charAt(0).toLowerCase()));
}


/**
 * Wraps every airport match into a div tag.
 * 
 * @param inputElement below which the drop down should appear
 * @param airports array of available airports
 * @returns array of div tags containing all matching airports
 */
function getAirportMatchesAsDiv(inputElement: HTMLElement | null, airports): JSX.Element[] {

    if (!inputElement) 
        return [];
    
    let inputText = (inputElement as HTMLInputElement).value;
    if (!inputText) 
        return [];

    // wrap search results in div tags
    return getAirportMatches(inputText, airports).map(airport => (
                                                <div className="SearchFlight-dropDown-item" 
                                                    onMouseDown={() => {(inputElement as HTMLInputElement).value = airport}}>
                                                    {airport}
                                                </div>));
}


/**
 * Event handler for typing in the text in puts. Displays the drop downs if airport 
 * matches were found.
 * 
 * @param name of the input element
 * @param setSearchFlightItemDropDown setter for dropDown content
 * @param airports array with all available airports
 */
function handleKeyUp(name, setSearchFlightItemDropDown, airports): void {

    const inputElement = document.getElementById(name + "-input");
    const dropDown = document.getElementById(name + "-dropDown");

    if (inputElement && dropDown) {
        if (getAirportMatchesAsDiv(inputElement, airports).length !== 0) {
            dropDown.style.display = "block";
            setSearchFlightItemDropDown(getAirportMatchesAsDiv(inputElement, airports));

        } else 
            dropDown.style.display = "none";
    }
}


/**
 * Takes in a value array and concatenates values to a url with each value beeing a param
 * (e.g [Maria, Smith, 35] would becom Maria/Smith/35).
 * 
 * @returns url with given values as params
 */
function inputValuesToParams(): string {

    const searchFlightInputs = document.getElementsByClassName("SearchFlight-input");

    // join input values to url params
    return Array.from(searchFlightInputs)
                .map(inputElement => (inputElement as HTMLInputElement).value)
                .join("/");
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


/**
 * Fetches all airports available in db.
 * 
 * @param url endpoint of backend
 * @param setAirports setter for airport array
 * @returns promise with jsonResponse
 */
async function fetchAirports(url: string, setAirports) {

    return await sendHttpRequest(url, "get")
        .then(jsonResponse => setAirports(jsonResponse));
}