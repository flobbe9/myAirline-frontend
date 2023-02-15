import React from "react"
import { Link } from "react-router-dom"


export default function DropDown(props) {

    return (
        <div className={props.className}>
            <Link to="/test">{props.links}</Link>
        </div>
    )
}