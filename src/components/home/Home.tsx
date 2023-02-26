import React, { useEffect, useState } from "react";

import "./Home.css";
import moment from "moment";
import { addEventListenerForClass, addEventListenerForDocumentExcludeClass, toggleColorOnclick } from "../../helperMethods/events/events";
import { Airport } from "../../mockdata/Airport";
import { mockAirports } from "../../mockdata/MockData";
import { Link } from "react-router-dom";

/**
 * 
 */
export default function Home(props) {

    // state
    const [searchFlightItemDropDown, setSearchFlightItemDropDown] = useState([<div style={{color:"grey"}}>Searching...</div>]);
    
    // add eventListeners
    useEffect(() => addEventListeners());
    
    return (
        <div className="Home">
            <div className="searchFlight-container">
                <h1 id="heading">Find your flight</h1><br />

                {/* Departure city */}
                <SearchFlightInput name="From"
                                   className="searchFlight-item" 
                                   dropDown={searchFlightItemDropDown} 
                                   dropDownSetter={setSearchFlightItemDropDown} />

                {/* Destination city */}
                <SearchFlightInput name="To"
                                   className="searchFlight-item" 
                                   dropDown={searchFlightItemDropDown} 
                                   dropDownSetter={setSearchFlightItemDropDown} />

                {/* Departure date */}
                <label className="searchFlight-item-label" htmlFor="Date">Date</label>
                <div className="searchFlight-item">
                    <input className="searchFlight-item-input" name="Date" type="date" value={moment().format('YYYY-MM-DD')} />
                </div>

                {/* Departure time */}
                <label className="searchFlight-item-label" htmlFor="Time">Time</label>
                <div className="searchFlight-item">
                    <input className="searchFlight-item-input" name="Time" type="time" value={getTimeNowFormatted()}/>
                </div>

                {/* Search button */}
                <div className="searchFlight-item">
                    <Link to="/service">
                        <button id="searchFlight-item-submit">Search</button>
                    </Link>
                </div>
            </div>

            <div className="someOtherContent">
                <h2>Other content</h2>
            </div>
        </div>
    )
};


function SearchFlightInput(props) {

    // state
    const [searchFlightItemDropDown, setSearchFlightItemDropDown] = [props.dropDown, props.dropDownSetter];

    return (
        <>
            <label className={props.className + "-label"} htmlFor={props.name}>{props.name}</label>
            <div className={props.className}>
                
                <input 
                    id={props.name + "-input"}
                    className={props.className + "-input"}
                    type="text" 
                    name={props.name} 
                    onKeyUp={() => setSearchFlightItemDropDown(getAirportMatchesAsDiv(document.getElementById(props.name + "-input")))} 
                    autoComplete="off"
                    />

                <div id={props.name + "-dropDown"} className={props.className + "-dropDown"}>
                    {searchFlightItemDropDown}
                </div>
            </div>
        </>
    )
}


const searchFlightItems = document.getElementsByClassName("searchFlight-item");
const searchFlightItemInputs = document.getElementsByClassName("searchFlight-item-input");
const searchFlightItemDropDowns = document.getElementsByClassName("searchFlight-item-dropDown");

const dropDownTemplate = [<div style={{color:"grey"}}>Searching...</div>];


function addEventListeners() {

    // show dropDown onclick
    addEventListenerForClass(searchFlightItemInputs, "mousedown", (i: number) => {
        (searchFlightItemDropDowns[i] as HTMLElement).style.display = "block";
    });

    // hide dropDown onclick outside
    addEventListenerForDocumentExcludeClass(searchFlightItems, "mousedown", (i: number) => {
        (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";
    });

    // hide dropDown onclick on search result also
    addEventListenerForClass(searchFlightItemDropDowns, "click", (i: number) => {
        (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";
    })

    // make submit button change color
    toggleColorOnclick(document.getElementById("searchFlight-item-submit"), "rgb(177, 177, 177)");
}


function getAirportMatches(subString: string): Airport[] {

    // iterate airports
    return mockAirports.filter(airport => airport.name.toLowerCase()
                                                      .includes(subString.toLowerCase()));
}


function getAirportMatchesAsDiv(input: HTMLElement | null): JSX.Element[] {

    if (!input) 
        return dropDownTemplate;

    let inputText = (input as HTMLInputElement).value;
    if (!inputText) 
        return dropDownTemplate;

    // wrap search result in div tag
    const matches = getAirportMatches(inputText).map(airport => 
        (<div className="searchResult" onClick={() => {(input as HTMLInputElement).value = airport.name;}}>
            {airport.name}
        </div>)
    );

    return (matches.length === 0) ? dropDownTemplate : matches;
}


function getTimeNowFormatted(): string {
    
    const today = new Date();
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();

    hours = hours.length === 1 ?
        "0" + hours : hours.toString();

    minutes = minutes.length === 1 ?
        "0" + minutes : minutes.toString();

    return hours + ":" + minutes;
}


/**
 * TODO
 * Remove "Searching..." box
 * Replace submit link
 */