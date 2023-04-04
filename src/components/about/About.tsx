import React from "react";
import "./About.css";


/**
 * Page giving general information about myAirline.
 * Currently no content.
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
export default function About(props) {

    const className = "About";

    return (
        <div className={className}>
            <h1>About</h1>

            <div className={className + "-container"}>
                <p id={className + "-p1"}>
                    This is information about this airline, the company and it's services. <br />
                    ...
                </p>
            </div>
        </div>
    )
}