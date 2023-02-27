import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";


export default function Footer(props) {

    return (
        <div className="Footer-container">
            <div style={{display: "inline"}}>&copy;</div>
            <div style={{display: "inline", paddingRight: "200px"}}>
                myAirline
            </div>
            <Link to="/contact" className="Footer-item">
                Contact
            </Link>
            <Link to="/service" className="Footer-item">
                Service
            </Link>
            <Link to="/about" className="Footer-item">
                About
            </Link>
        </div>
    )
}