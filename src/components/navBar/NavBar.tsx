import React, { useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { addEventListenerForClass } from "../../helperMethods/events/events.ts"
import DropDown from "./dropDown/DropDown.tsx";


export default function NavBar(props) {

    // add eventListeners
    useEffect(() => addEventListeners());

    const className = "NavBar";
    
    return (
        <div className={className}>
            <Link id="myAirline-logo" to="/">
                myAirline
            </Link>

            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/">
                    Search
                </Link>
                <DropDown links="TestPage" className={className + "-dropDown"} />
            </div>
            
            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/service">
                    Service
                </Link>
                <DropDown links="TestPage" className={className + "-dropDown"} />
            </div>
            
            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/jobs">
                    Jobs
                </Link>
                <DropDown links="TestPage" className={className + "-dropDown"} />
            </div>

            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/contact">
                    Contact
                </Link>
                <DropDown links="TestPage" className={className + "-dropDown"} />
            </div>

            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/about">
                    About
                </Link>
                <DropDown links="TestPage" className={className + "-dropDown"} />
            </div>

            <div style={{float:"right"}} className={className + "-item"}>
                <Link className={className + "-heading"} to="/register">
                    Register
                </Link>
            </div>
            
            <div style={{float:"right"}} className={className + "-item"}>
                <Link className={className + "-heading"} to="/login">
                    Login
                </Link>
            </div>
        </div>
    )
}


const navBarItems = document.getElementsByClassName("NavBar-item");
const navBarDropDowns = document.getElementsByClassName("NavBar-dropDown");


function addEventListeners() {

    // show NavBar-dropDown on hover
    addEventListenerForClass(navBarItems, "mouseover", (i: number) => {
        (navBarDropDowns[i] as HTMLElement).style.display = "block";
        
    })

    addEventListenerForClass(navBarItems, "mouseout", (i: number) => {
        (navBarDropDowns[i] as HTMLElement).style.display = "none";
    })
}


