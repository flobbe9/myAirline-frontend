import React, { useEffect } from "react";
import "./Contact.css";
import { setTitle } from "../../utils/events/events";


/**
 * Page giving contact information for myAirline like email, phone etc.
 
 * Currently no content.
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
export default function Contact(props) {

    useEffect(() => setTitle("myAirline | Contact"))

    const className = "Contact";

    return (
        <div className={className}>
            <h1>Contact</h1>

            <div className={className + "-container"}>
                <p id={className + "-p1"}>
                    This is how you can contact us:<br /> <br />
                    Email <br />
                    Phone <br />
                    Adress <br />
                    ...
                </p>
            </div>
        </div>
    )
}