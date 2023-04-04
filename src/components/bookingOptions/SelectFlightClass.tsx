import React from "react";
import "./BookingOptions.css";
import "./SelectFlightClass.css";

export function SelectFlightClass(props) {
    
    const className = props.className;
    
    return (
        <div className={className} >
            <h2 style={{textAlign:"left"}}>Flight class*</h2>

            <div className={className + "-container"}>
                <FlightClassRadioButton 
                    className={className}
                    type="Economy"
                    labelText="Economy class (free)"
                    infoText="Standard flight class."
                    defaultChecked="true"/>

                <FlightClassRadioButton 
                    className={className}
                    type="Business"
                    labelText="Business class (+ 30€)"
                    infoText="More comfortable flight class."/>

                <FlightClassRadioButton 
                    className={className}
                    type="First"
                    labelText="First class (+ 50€)"
                    infoText="The most comfortable flight class we can offer."/>
            </div>
        </div>
    )
}


function FlightClassRadioButton(props) {

    const className = props.className;

    return (
        <div className={className + "-item"}>
            <input className={className + "-radioButton"} type="radio" value={props.type} name="flightClass" defaultChecked={props.defaultChecked} />
            <label htmlFor="seatType">{props.labelText}</label>
            <br />
            
            <section className={className + "-infoText"}>{props.infoText}</section>
        </div>
    )
}