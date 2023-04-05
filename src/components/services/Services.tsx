import React, { useEffect } from "react";
import "./Services.css";
import { setTitle } from "../../utils/events/events";


/**
 * Page giving general information about services offered by myAirline like help with the booking process, feedback etc.
 
 * Currently no content.
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
export default function Services(pops) {

    useEffect(() => setTitle("myAirline | Services"))

    const className = "Services";

    return (
        <div className={className}>
            <h1>{className}</h1>

            <div className={className + "-container"}>
                <p id={className + "-p1"}>
                    This is about the services we offer as airline in general: <br /><br />
                    Feedback <br />
                    HelpCenter <br />
                    ...
                </p>
            </div>
        </div>
    )
}