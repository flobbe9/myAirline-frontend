import React from "react";
import "./Services.css";


export default function Services(pops) {

    const className = "Services";

    return (
        <div className={className}>
            <h1>{className}</h1>

            <div className={className + "-container"}>
                <p id={className + "-p1"}>
                    This is about the services we offer as airline in general: <br /><br />
                    Booking <br />
                    HelpCenter <br />
                    Contact <br />
                    ...
                </p>
            </div>
        </div>
    )
}