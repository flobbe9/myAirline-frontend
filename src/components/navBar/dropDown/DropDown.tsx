import React from "react";
import { Link } from "react-router-dom";
import "./DropDown.css";


export default function DropDown(props) {

    return (
        <div className={props.className}>
            <Link className="DropDown-item" to="/test">{props.links}</Link>
        </div>
    )
}