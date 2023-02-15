// TODO: replace alerts
// TODO: write tests
// TODO: add docs
import fetch from "node-fetch";
import { FetchHeader, isFetchHeaderValid } from "./FetchHeader.ts";


export async function sendHttpRequest(url: string, fetchHeader: FetchHeader) {

    // case: fetchHeader invalid
    if (!isFetchHeaderValid(fetchHeader) || !url) {
        alert("Falsy FetchHeader.");
        return;
    }

    try {
        const response = await fetch(url, fetchHeader);

        // case: request unsuccessful
        if (!response.ok) {
            alert("Request failed: " + response.status);
            return;
        }

        const jsonResponse = await response.json();

        alert(jsonResponse);
        return jsonResponse;

    } catch (e) {
        alert("Error:\n" + e);
    }
}