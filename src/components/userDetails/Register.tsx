import React, { useEffect, useState } from "react";
import "./Register.css";
import { toggleColorOnclick } from "../../utils/events/events";
import { Link, useNavigate } from "react-router-dom";
import sendHttpRequest from "../../utils/fetch/fetch";


/**
 * Currently not in use!!
 * 
 * @param props 
 * @returns 
 * @since 0.0.2
 */
export default function Register(props) {

    const [errorMessage, setErrorMessage] = useState(<br />);
    const navigate = useNavigate();

    const className = "Register";

    useEffect(() => {
        // toggle color of buttons
        const submitButtons = document.getElementsByClassName("Register-submit");
        Array.from(submitButtons).forEach(submitButton => toggleColorOnclick((submitButton as HTMLElement), "rgb(230, 230, 230)"));

        window.scrollTo(0, 0);
    }, []);

    function handleSubmit(event) {

        event.preventDefault();

        // fetch validation
        fetchRegister("http://localhost:4002/user/register", setErrorMessage, navigate);
    }

    return (
        <div className={className}>
            <h1>Register</h1>

            <form id={className + "-container"} onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className={className + "-container"}>
                    <TextInput id="First name" className={className} pattern="[A-Za-zÄÖÜäöü]{1,100}"/>

                    <TextInput id="Surname" className={className} pattern="[A-ZÄÖÜa-zäöü]{1,100}"/>

                    <TextInput id="Mail" 
                        className={className} 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>

                    <TextInput id="Password" 
                        className={className} 
                        type="password" 
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.,;]).{7,16}$"/>

                    <TextInput id="Repeat password" 
                        className={className} 
                        type="password" 
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.,;]).{7,16}$"/>
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
        } else if (id === "Mail") {
            message = "Please enter a valid email.";

        // password input message
        } else if (id === "Password" && id === "Repeat password") {
            message = "Include uppercase, lowercase, numeric and special(!@#$%^&*_=+-.,;) characters.\n Password should be 7-16 characters long."
        
        // passwords should match
        } else if (id === "Repeat password" && !passwordsDoMatch())
            message = "Passwords do not match!";
        
        event.target.setCustomValidity(message);
    }

    return (
        <div className={className + "-item"}>
            <label>{id}</label>
            <br />
            
            <input className={className + "-input"} 
                type={props.type} 
                id={id}
                autoComplete="off"
                pattern={props.pattern} 
                onInvalid={handleInvalid}
                onInput={event => (event.target as HTMLSelectElement).setCustomValidity("")}
                required />
        </div>)
}


function passwordsDoMatch(): boolean {

    const password1 = document.getElementById("Password");
    const password2 = document.getElementById("Repeat password");

    return password1 === password2;
}


async function fetchRegister(url: string, setErrorMessage, navigate) {
    
    const emailInput = document.getElementById("Mail");
    const firstNameInput = document.getElementById("First name");
    const surNameInput = document.getElementById("Surname");
    const passwordInput = document.getElementById("Password");
    
    const body: UserDetailsWrapper = {
        firstName: (firstNameInput as HTMLInputElement).value,
        surName: (surNameInput as HTMLInputElement).value,
        email: (emailInput as HTMLInputElement).value,
        password: (passwordInput as HTMLInputElement).value
    };

    // TODO: while pending, display some kind of loading symbol
    await sendHttpRequest(url, "post", body)
        .then(jsonResponse => {
            (jsonResponse.status === 200)? navigate("/register/confirmEmail") : setErrorMessage(jsonResponse.message);
        });
}


interface UserDetailsWrapper {
    firstName: string,
    surName: string,
    email: string,
    password: string
}