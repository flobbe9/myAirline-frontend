import React, { useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { addEventListenerForClass } from "../../utils/events/events.ts"


/**
 * Bar with navigation elements displayed (sticky) on top of every page.
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
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

                {/* DropDown */}
                {/* <div className={className + "-dropDown"}>
                    <Link to="/test" className={className + "-dropDown-item"}>TestPage</Link>
                </div> */}
            </div>
            
            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/services">
                    Services
                </Link>

                {/* DropDown */}
                {/* <div className={className + "-dropDown"}>
                    <Link to="/test" className={className + "-dropDown-item"}>TestPage</Link>
                </div> */}
            </div>
            
            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/jobs">
                    Jobs
                </Link>

                {/* DropDown */}
                {/* <div className={className + "-dropDown"}>
                    <Link to="/test" className={className + "-dropDown-item"}>TestPage</Link>
                </div> */}
            </div>

            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/contact">
                    Contact
                </Link>

                {/* DropDown */}
                {/* <div className={className + "-dropDown"}>
                    <Link to="/test" className={className + "-dropDown-item"}>TestPage</Link>
                </div> */}
            </div>

            <div className={className + "-item"}>
                <Link className={className + "-heading"} to="/about">
                    About
                </Link>

                {/* DropDown */}
                {/* <div className={className + "-dropDown"}>
                    <Link to="/test" className={className + "-dropDown-item"}>TestPage</Link>
                </div> */}
            </div>

            {/* <div style={{float:"right"}} className={className + "-item"}>
                <Link className={className + "-heading"} to="/register">
                    Register
                </Link>
            </div>
            
            <div style={{float:"right"}} className={className + "-item"}>
                <Link className={className + "-heading"} to="/login">
                    Login
                </Link>
            </div> */}
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


