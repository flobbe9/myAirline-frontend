import React, { useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { setDisplayOfClass } from "../../helperMethods/events/events.ts"


export default function NavBar(props) {

    // add eventListeners
    useEffect(() => addEventListeners());
    
    return (
        <div className="NavBar-container">
            <Link id="myAirline-logo" to="/">
                myAirline
            </Link>

            {/* <div className="NavBar-item">
                <Link className="NavBar-element-container" to="/">
                    Home
                    <div className="NavBar-element-item">
                        DropDown
                    </div>
                </Link>
            </div> */}
            
            <Link className="NavBar-item" to="/service">
                Service
                <div className="NavBar-dropDown">
                    DropDown
                    {/** <DropDown className="NavBar-dropDown-item" /> */}
                </div>
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


const navBarItems = document.getElementsByClassName("NavBar-item");
const navBarDropDowns = document.getElementsByClassName("NavBar-dropDown");


function addEventListeners() {

    // show NavBar-dropDown on hover
    setDisplayOfClass(navBarItems, "mouseover", "block", navBarDropDowns);
    setDisplayOfClass(navBarItems, "mouseout", "none", navBarDropDowns);
}