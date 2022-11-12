// To be used for input and handle the geolocation request
import React from "react";
import clsx from "clsx";

export function Location(props) {
    return (
        <form>
            <input placeholder="Select a city"></input>
            <button>Use my current location</button>
        </form>
    );
}