import React from "react";
import "./SearchResult.css";


export default function SearchResult(props) {

    return (
        <div className="SearchResult">
            <h1>Search results</h1>

            <div className="SearchResult-container">
                <FlightResult className="SearchResult-item" flightDetails={{}}/>
            </div>
        </div>
    )
}


function FlightResult(props) {

    function handleClick() {
        
    }

    return (
        <div className={props.className} onClick={handleClick}>
            <div className={props.className + "-departure"}>
                <div>
                    Hamburg
                    <div className={props.className + "-arrow"}>
                        {"->"}
                    </div>
                </div>
                <div>10:00 </div >
                <div className={props.className + "-details"}>27.02.23</div>
                <br />
                <div className={props.className + "-airline"}>RaynAir</div>
            </div>

            <div className={props.className + "-destination"}>
                <div>München</div>
                <div>12:45</div>
                <div className={props.className + "-details"}>27.02.23</div>
                <br />
                <div className={props.className + "-price"}>34,00€</div>
            </div>

        </div>
    )
}