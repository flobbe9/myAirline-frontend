import React from "react";
import "./Login.css";


export default function Login(props) {

    const className = "Login";

    return (
        <div className={className}>
            <h1>Login</h1>

            <div className={className + "-container"}>
                <input type="text" />
            </div>
        </div>)
}