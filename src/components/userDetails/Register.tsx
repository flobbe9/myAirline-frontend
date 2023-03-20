import React, { useEffect, useState } from "react";
import "./Register.css";
import { addEventListenerForClass, toggleColorOnclick } from "../../helperMethods/events/events";
import { Link } from "react-router-dom";
import { getErrorMessage, isEmailValid, isTextInputValid } from "../searchFlight/SearchFlight";
import sendHttpRequest from "../../helperMethods/fetch/fetch";


export default function Register(props) {

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<br />);
    

    const className = "Register";

    const submitButton = <input className={className + "-submit"} type="submit" value="Submit" onClick={handleSubmit}/>;

    useEffect(() => {
        // toggle color of buttons
        const submitButtons = document.getElementsByClassName("Register-submit");
        Array.from(submitButtons).forEach(submitButton => toggleColorOnclick((submitButton as HTMLElement), "gray"));

        window.scrollTo(0, 0);
    }, []);

    function handleSubmit(event) {

        event.preventDefault();
        
        // fetch validation
        fetchRegister("http://localhost:4001/register", setErrorMessage, setIsFormValid);

        // alert(isFormValid);
    }

    return (
        <div className={className}>
            <h1>Register</h1>

            <form>
                {/* Input fields */}
                <div className={className + "-container"}>
                    <TextInput className={className} name="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>

                    <TextInput className={className} name="First name" pattern="[A-Za-z]{1,100}"/>

                    <TextInput className={className} name="Surname" pattern="[A-Za-z]{1,100}"/>
                </div>
                <br />

                {/* Buttons */}
                <div className={className + "-container-submit"}>
                    {/* TODO: does not work */}
                    {isFormValid?
                        <Link to={props.params + "/confirmEmail"} >
                            {submitButton}  
                        </Link> :
                        <div>{submitButton}</div>}
                    
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
    const name = props.name;

    return (
        <div className={className + "-item"}>
            <label htmlFor={name}>{name}</label>
            <br />
            <input className={className + "-input"} 
                type="text" 
                name={name} 
                pattern={props.pattern} 
                required/>
        </div>)
}


async function fetchRegister(url, setErrorMessage, setIsFormValid) {

    // const email = "florin735@live.com";
    const emailInput = document.getElementsByName("Email");
    const email = (emailInput[0] as HTMLInputElement).value;
    const firstName = "Florin";
    const surName = "Schikarski";

    const body = {
        email: email,
        firstName: firstName,
        surName: surName
    };

    const response = await sendHttpRequest(url, "post", body);

    (response.status === 200)? setIsFormValid(true) : setErrorMessage(response.message);
}