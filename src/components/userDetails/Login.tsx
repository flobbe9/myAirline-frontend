import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toggleColorOnclick } from "../../helperMethods/events/events";
import sendHttpRequest from "../../helperMethods/fetch/fetch";


export default function Login(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const className = "Login";
    
    useEffect(() => {
        const submitButton = document.getElementById(className + "-submit");
        toggleColorOnclick((submitButton as HTMLElement), "gray");

        window.scroll(0, 0);
    }, [])

    function handleSubmit(event) {

        event.preventDefault();

        // fetch login
        fetchLogin("http://localhost:4001/login", setErrorMessage, navigate);
    }

    return (
        <div className={className}>
            <h1>Login</h1>

            <form className={className + "-container"} onSubmit={handleSubmit}>
                {/* Mail */}
                <InputElement id="Mail" className={className} type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>

                {/* Password */}
                <InputElement id="Password" className={className} type="password" />

                <button id={className + "-submit"} type="submit">Submit</button>                
                <br />
            </form>

            {/* Error message */}
            <div id={className + "-errorMessage"}>{errorMessage}</div>
        </div>)
}


function InputElement(props) {

    const className = props.className;
    const id = props.id;

    function handleInvalid(event) {

        const inputElement = document.getElementById(id);
        let message = "";

        // emtpy input
        if ((inputElement as HTMLInputElement).value === "") {
            message = "Please fill out this field.";

        // mail input
        } else if (id === "Mail")
            message = "Please enter a valid email.";

        event.target.setCustomValidity(message);
    }

    return (
        <div>
            <label>{id}</label><br />
            <input id={id}
                className={className + "-input"} 
                type={props.type} 
                autoComplete="off"
                pattern={props.pattern}
                required
                onInvalid={handleInvalid}
                onInput={event => (event.target as HTMLSelectElement).setCustomValidity("")} />

            <br /><br />
        </div>)
}


async function fetchLogin(url: string, setErrorMessage, navigate) {

    const emailInput = document.getElementById("Mail");
    const passwordInput = document.getElementById("Password");
    
    const body = {
        email: (emailInput as HTMLInputElement).value,
        password: (passwordInput as HTMLInputElement).value
    };
    
    const response = await sendHttpRequest(url, "post", body);

    (response.status === 200)? navigate("/jobs") : setErrorMessage(response.message);
}