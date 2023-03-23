import React, { useEffect, useState } from "react";
import "./Register.css";
import { toggleColorOnclick } from "../../helperMethods/events/events";
import { Link, useNavigate } from "react-router-dom";
import sendHttpRequest from "../../helperMethods/fetch/fetch";


export default function Register(props) {

    const [errorMessage, setErrorMessage] = useState(<br />);
    const navigate = useNavigate();

    const className = "Register";

    useEffect(() => {
        // toggle color of buttons
        const submitButtons = document.getElementsByClassName("Register-submit");
        Array.from(submitButtons).forEach(submitButton => toggleColorOnclick((submitButton as HTMLElement), "gray"));

        window.scrollTo(0, 0);
    }, []);

    function handleSubmit(event) {

        event.preventDefault();

        // fetch validation
        fetchRegister("http://localhost:4001/register", setErrorMessage, navigate);
    }

    return (
        <div className={className}>
            <h1 onClick={event => {
                const inputElement = document.getElementById("Mail");

                alert((inputElement as HTMLSelectElement).checkValidity())

            }}>Register</h1>

            <form id={className + "-container"} onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className={className + "-container"}>
                    <TextInput id="Mail" className={className} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>

                    <TextInput id="First name" className={className} pattern="[A-Za-z]{1,100}"/>

                    <TextInput id="Surname" className={className} pattern="[A-Za-z]{1,100}"/>
                </div>
                <br />

                {/* Buttons */}
                <div className={className + "-container-submit"}>
                    <input className={className + "-submit"} type="submit" value="Submit" />
                    <div id={className + "-errorMessage"}>{errorMessage}</div>
                    <hr />

                    <p>Already have an account?</p>
                    {/* TODO: add some redirect information in params */}
                    <Link to="/login">
                        <button className={className + "-submit"}>Login</button>
                    </Link>
                </div>

            </form>
        </div>)
}


function TextInput(props) {

    const className = props.className;
    const id = props.id;
    
    function handleInvalid(event) {
        
        const inputElement = document.getElementById(id);
        let message = "Please use only alphabetical characters.";  

        // emtpy input message
        if ((inputElement as HTMLInputElement).value === "") {
            message = "Please fill out this field.";
        
        // mail input message
        } else if (id === "Mail") 
            message = "Please enter a valid email.";

        event.target.setCustomValidity(message);
    }

    return (
        <div className={className + "-item"}>
            <label>{id}</label>
            <br />
            
            <input className={className + "-input"} 
                type="text" 
                id={id}
                autoComplete="off"
                pattern={props.pattern} 
                onInvalid={handleInvalid}
                onInput={event => (event.target as HTMLSelectElement).setCustomValidity("")}
                required />
        </div>)
}


async function fetchRegister(url: string, setErrorMessage, navigate) {
    
    const emailInput = document.getElementById("Mail");
    const firstNameInput = document.getElementById("First name");
    const surNameInput = document.getElementById("Surname");
    
    const body = {
        email: (emailInput as HTMLInputElement).value,
        firstName: (firstNameInput as HTMLInputElement).value,
        surName: (surNameInput as HTMLInputElement).value
    };
    
    const response = await sendHttpRequest(url, "post", body);

    (response.status === 200)? navigate("/register/confirmEmail") : setErrorMessage(response.message);
}