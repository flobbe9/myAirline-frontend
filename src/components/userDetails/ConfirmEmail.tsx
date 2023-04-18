import React from "react";
import "./ConfirmEmail.css"
import { Link } from "react-router-dom";


/**
 * Currently not in use!!
 * 
 * @param props 
 * @returns 
 * @since 0.0.2
 */
export default function ConfirmEmail(props) {
    
    const className = "ConfirmEmail";

    return (
        <div className={className}>
            <h1>Please check your mails</h1>

            <div>We've sent you an email to confirm your new account.</div><br />

            <Link to="/">
                <button id={className + "-home"}>Home</button>
            </Link>
        </div>)
}