import React from "react";
import "./About.css";


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