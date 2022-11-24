import { StringifyOptions } from "querystring";
import React from "react";
import AutoComplete from "react-google-autocomplete";
import styles from './Autocomplete.module.css';
//import clsx from "clsx";

interface HandlePlaceChange {
    (coords: string, place: string): void;
}

export interface AutocompleteProps {
    placeholder?: string;
    handlePlaceChange: HandlePlaceChange;
}

export interface Location {
    location: {
        lat(): void,
        lng(): void
    }
}

export interface Place {
    formatted_address: string;
    geometry: Location;
    name: string;
    html_attributions: [];
}

export function Autocomplete(props: AutocompleteProps) {
    let {
        placeholder: placeholder,
        handlePlaceChange: handlePlaceChange,
        ...otherProps
    } = props;

    const options = {
        fields: ['formatted_address', 'geometry', 'name']
    };

    function getPlace(place: Place) {
        const coords = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
        props.handlePlaceChange(coords, place.formatted_address);
    }

    return (
        <AutoComplete
            apiKey="AIzaSyBA10k4Go8Xy1OUV2fHVkmEIBwmCQ5FyYs"
            onPlaceSelected={getPlace}
            language="en"
            options={options}>{/* To use defaultValue with the stored value from the cookie */}</AutoComplete>
    )
}