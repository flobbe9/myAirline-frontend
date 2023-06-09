import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";


/**
 * Footer with a few links displayed on the bottom of every page.
 * 
 * @param props 
 * @returns 
 * @since 0.0.1
 */
export default function Footer(props) {

    const className = "Footer";

    return (
        <div className={className}>
            <div style={{display: "inline"}}>&copy;</div>
            <div style={{display: "inline", paddingRight: "200px"}}>
                myAirline
            </div>
            <Link to="/contact" className={className + "-item"}>
                Contact
            </Link>
            <Link to="/services" className={className + "-item"}>
                Services
            </Link>
            <Link to="/about" className={className + "-item"}>
                About
            </Link>
        </div>
    )
}