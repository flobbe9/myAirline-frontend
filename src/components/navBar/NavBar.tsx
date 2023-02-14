import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";


export default function NavBar(props) {

    return (
        <div className="NavBar-container">
            <Link id="myAirline-logo" className="NavBar-item" to="/">
                myAirline
            </Link>

            <Link className="NavBar-item" to="/">
                Home
            </Link>
            
            <Link className="NavBar-item" to="/service">
                Service
            </Link>
            
            <Link className="NavBar-item" to="/jobs">
                Jobs
            </Link>
            
            <Link className="NavBar-item" to="/contact">
                Contact
            </Link>
            
            <Link className="NavBar-item" to="/about">
                About
            </Link>
        </div>
    )
}