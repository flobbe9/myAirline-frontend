import React, { useEffect, useState } from "react";
import "./Register.css";
import { toggleColorOnclick } from "../../helperMethods/events/events";
import { Link } from "react-router-dom";
import { getErrorMessage, isTextInputValid } from "../searchFlight/SearchFlight";


export default function Register(props) {

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<br />);

    useEffect(() => {
        const submitButtons = document.getElementsByClassName("Register-submit");

        Array.from(submitButtons).forEach(submitButton => toggleColorOnclick((submitButton as HTMLElement), "gray"));

        window.scrollTo(0, 0);
    }, []);

    const className = "Register";
    const submitButton = <button className={className + "-submit"}
                            onMouseOver={() => handleSubmitMouseOver(setIsFormValid, className)}
                            onClick={() => {if (!isFormValid) handleSubmitClick(setErrorMessage, isFormValid)}}>
                                Submit
                        </button>;

    return (
        <div className={className}>
            <h1>Register</h1>

            <div className={className + "-container"}>
                <TextInput className={className} name="Email"/>

                <TextInput className={className} name="First name"/>

                <TextInput className={className} name="Surname"/>
            </div>
            <br />

            <div className={className + "-container-submit"}>
                {isFormValid?
                    /* TODO: add some redirect information in params */
                    <Link to={props.params + "/confirmEmail"} >
                        {submitButton}
                    </Link> :
                    <>{submitButton}</>
                }

                <div id={className + "-errorMessage"}>{errorMessage}</div>
                <hr />

                <p>Already have an account?</p>

                {/* TODO: add some redirect information in params */}
                <Link to="/login">
                    <button className={className + "-submit"}>Login</button>
                </Link>
            </div>
        </div>)
}


function TextInput(props) {

    const className = props.className;
    const name = props.name;

    return (
        <div className={className + "-item"}>
            <label htmlFor={name}>{name}</label>
            <br />
            <input className={className + "-input"} type="text" name={name} />
        </div>)
}


function handleSubmitMouseOver(setIsFormValid, className): boolean {

    const inputs = document.getElementsByClassName(className + "-input");

    // iterate inputs
    Array.from(inputs).forEach(input => {
        const isValid = isTextInputValid((input as HTMLInputElement).value);

        // set state
        setIsFormValid(isValid);

        // return and set error message
        if (!isValid) {
            return;
        }
    })

    return true;
}


function handleSubmitClick(setErrorMessage, isFormValid) {

    if (!isFormValid) {
        setErrorMessage(getErrorMessage(Error("text")));
        return;
    }
}