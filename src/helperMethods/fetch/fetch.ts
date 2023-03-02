import { FetchHeader, isFetchHeaderValid } from "./FetchHeader.ts";


// TODO: replace alerts
export default async function sendHttpRequest(url: string, method: string, contentType: string, body?) {
    // set headers
    const fetchHeader: FetchHeader = {
        method: method,
        headers: {
            "Content-Type": contentType
        }
    }
    if (body) fetchHeader.body = JSON.stringify(body);

    // case: headers invalid
    if (!isFetchHeaderValid(fetchHeader) || !url) {
        alert("Falsy FetchHeader.");
        return;
    }

    try {
        // send request
        const response = await fetch(url, fetchHeader);

        // case: request unsuccessful
        if (!response.ok) {
            alert("Request failed: " + response.status);
            return;
        }

        // return response as json
        return await response.json();

    // case: failed to fetch
    } catch(e) {
        alert(e);
    }
}
