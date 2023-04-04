import React from "react";
import "./Jobs.css";


export default function Jobs(props) {

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