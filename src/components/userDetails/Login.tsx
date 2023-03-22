import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { toggleColorOnclick } from "../../helperMethods/events/events";


export default function Login(props) {

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const className = "Login";
    
    const submitButton = isFormValid? <Link to="">
                                        <button id={className + "-submit"}>Submit</button>
                                      </Link> : 
                                      <button id={className + "-submit"}>Submit</button>

    useEffect(() => {
        const submitButton = document.getElementById(className + "-submit");

        toggleColorOnclick((submitButton as HTMLElement), "gray");

        window.scroll(0, 0);
    }, [])

    return (
        <div className={className}>
            <h1>Login</h1>

            <div className={className + "-container"}>
                <label htmlFor="email">Email</label><br />
                <input className={className + "-input"} type="text" name="email" /><br /><br />

                <label htmlFor="password">Password</label><br />
                <input className={className + "-input"} type="password" name="password" /> <br /><br />

                {submitButton}<br />
                <div id={className + "-errorMessage"}>{errorMessage}</div>
            </div>
        </div>)
}


function handleSubmit() {

    // validate email

    // validate password

    // fetch login request

    // redirect or display error message
}