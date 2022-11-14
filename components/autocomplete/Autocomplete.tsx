import React from "react";
import AutoComplete from "react-google-autocomplete";
import styles from './Autocomplete.module.css';
//import clsx from "clsx";

export interface AutocompleteProps {
    placeholder?: string;
    handlePlaceChange(): void;
}

export interface Place {
    formatted_address: string;
    geometry: {};
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
            options={options}>{/* To use defaultValue with the stored value from the cookie */}</AutoComplete>
    )
}