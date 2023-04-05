import React, { useEffect } from "react";
import "./Jobs.css";
import { setTitle } from "../../utils/events/events";


/**
 * Page giving information about current job offers and general career chances at myAirline.
 
 * Currently no content.
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
export default function Jobs(props) {

    useEffect(() => setTitle("myAirline | Jobs"))

    const className = "Jobs";

    return (
        <div className={className}>
            <h1>Jobs</h1>

            <div className={className + "-container"}>
                <p id={className + "-p1"}>
                    Here are some jobs we offer at the moment and why you should consider us for your career.<br />
                    ...
                </p>
            </div>
        </div>
    )
}