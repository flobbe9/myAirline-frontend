import React, { useEffect } from "react";
import "./BookingOptions.css";
import "./SelectSeat.css";

export function SelectSeat(props) {
    
    const className = props.className;
    
    return (
        <div className={className} >
            <h2 style={{textAlign:"left"}}>Seat preference*</h2>

            <div className={className + "-container"}>
                <SeatRadioButton 
                    className={className}
                    id="0"
                    labelText="Random seat (free)"
                    infoText="You will be assigned a random seat. No additional cost will be added."
                    defaultChecked="true"/>

                <SeatRadioButton 
                    className={className}
                    id="1"
                    labelText="Window seat (+ 5€)"
                    infoText="A seat next to a window. If available, a 5€ fee will be added to your ticket price."/>

                <SeatRadioButton 
                    className={className}
                    id="2"
                    labelText="Corridor seat (+ 5€)"
                    infoText="A seat beside the corridor. If available, a 5€ fee will be added to your ticket price."/>

                <SeatRadioButton 
                    className={className}
                    id="3"
                    labelText="Foot room (+ 5€)"
                    infoText="A seat with more space to the front seat. If available, a 5€ fee will be added to your ticket price."/>
            </div>

            <div id={className + "-errorMessage"}>We're sorry, there's no seat of this type available anymore. Please select another seat type.</div>
        </div>
    )
}


function SeatRadioButton(props) {

    const className = props.className;

    return (
        <div className={className + "-item"}>
            <input id={props.id} className={className + "-radioButton"} type="radio" name="Seat" defaultChecked={props.defaultChecked} />
            <label htmlFor="Seat">{props.labelText}</label>
            <br />
            
            <section className={className + "-infoText"}>{props.infoText}</section>
        </div>
    )
}


export function isSelectSeatValid(): boolean {

    // is seat type available?

    // has fee been added to flight details?

    return true;
}