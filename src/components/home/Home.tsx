import React, { useEffect, useState } from "react";

import "./Home.css";
import moment from "moment";
import { addEventListenerForClass } from "../../helperMethods/events/events";
import { Airport } from "../../airport/Airport";
import { mockAirports } from "../../airport/MockData";


export default function Home(props) {

    // state
    const [searchFlightItemDropDown, setSearchFlightItemDropDown] = useState([<div style={{color:"grey"}}>search...</div>]);
    
    const fromInput = document.getElementById("From-input");
    const toInput = document.getElementById("To-input");
    
    // add eventListeners
    useEffect(() => addEventListeners());
    
    return (
        <div className="Home">
            <h1 id="heading">Find your flight</h1>


            <div className="searchFlight-container">
                {/* Departure city */}
                <label className="searchFlight-item-label" htmlFor="From">From</label>
                <div className="searchFlight-item">
                    <input id="From-input" className="searchFlight-item-input" onKeyUp={() => setSearchFlightItemDropDown(getAirportMatchesAsDiv(fromInput))} name="From" type="text" /> 

                    <div id="From-dropDown" className="searchFlight-item-dropDown">
                        {searchFlightItemDropDown}
                    </div>
                </div>

                {/* Destination city */}
                <label className="searchFlight-item-label" htmlFor="To">To</label>
                <div className="searchFlight-item">
                    <input id="To-input" className="searchFlight-item-input" onKeyUp={() => setSearchFlightItemDropDown(getAirportMatchesAsDiv(toInput))} type="text" />

                    <div className="searchFlight-item-dropDown">
                        {searchFlightItemDropDown}
                    </div>
                </div>

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

                {/* Search */}
                <div className="searchFlight-item">
                    <button>Search</button>
                </div>
            </div>


            <div className="someOtherContent">
                <h2>Other content</h2>
            </div>
        </div>
    )
};


const dropDownTemplate = [<div style={{color:"grey"}}>search...</div>];

const searchFlightItemDropDowns = document.getElementsByClassName("searchFlight-item-dropDown");
const searchFlightItemInputs = document.getElementsByClassName("searchFlight-item-input");
const searchFlightItems = document.getElementsByClassName("searchFlight-item");


function addEventListeners() {

    // show dropDown onclick
    addEventListenerForClass(searchFlightItemInputs, "mousedown", (i: number) => {
        (searchFlightItemDropDowns[i] as HTMLElement).style.display = "block";
    });

    // hide dropDown onclick outside
    document.addEventListener("mousedown", event => {
        hideDropDownOnClickOutside(event);
    });
}


// TODO: make universal method for adding event listener to document in events.ts?
function hideDropDownOnClickOutside(event: Event) {

    Array.from(searchFlightItems).forEach((item, i) => {
        if (!item.contains(event.target as Element))
            (searchFlightItemDropDowns[i] as HTMLElement).style.display = "none";
    });
}


function getAirportMatchesAsDiv(input: HTMLElement | null): JSX.Element[] {

    if (!input) 
        return dropDownTemplate;

    const inputText = (input as HTMLInputElement).value;
    if (!inputText) 
        return dropDownTemplate;

    const matches = getAirportMatches(inputText).map(airport => 
        (<div>
            {airport.name}
        </div>)
    );

    return (matches.length === 0) ? dropDownTemplate : matches;
}


function getAirportMatches(subString: string): Airport[] {

    // iterate airports
    return mockAirports.filter(airport => airport.name.toLowerCase()
                                                      .includes(subString.toLowerCase()));
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