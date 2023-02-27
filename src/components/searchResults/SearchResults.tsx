import React from "react";


export default function SearchResults(props) {

    return (
        <div className="SearchResults">
            <h1>Search results</h1>

            <div className="SearchResults-container">
                <SearchResult className="SearchResults-item" />
            </div>
        </div>
    )
}


function SearchResult(props) {

    return (
        <div className={props.className}>
            one search result
        </div>
    )
}