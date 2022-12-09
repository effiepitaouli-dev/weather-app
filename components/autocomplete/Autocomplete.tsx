import React, { useContext } from "react";
import AutoComplete from "react-google-autocomplete";
//import styles from './Autocomplete.module.css';
import { CoordsContext } from '../../pages/index';
export interface AutocompleteProps {
    placeholder?: string;
}
export interface Location {
    location: {
        lat(): void,
        lng(): void
    }
}

export interface Place {
    formatted_address: string;
    geometry: {},
    name: string;
    html_attributions: [];
}

export function Autocomplete(props: AutocompleteProps) {
    let {
        placeholder: placeholder,
        ...otherProps
    } = props;
    const setCoords = useContext(CoordsContext).setCoords;

    const options = {
        fields: ['formatted_address', 'geometry', 'name']
    };

    function getPlace(place: any) {
        if (place) {
            setCoords([place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address]);
        }
    }

    function handleKey(e: any) {
        // To avoid form submit on enter
        if (e.key == 'Enter') e.preventDefault();
    }

    return (
        <AutoComplete
            apiKey="AIzaSyBA10k4Go8Xy1OUV2fHVkmEIBwmCQ5FyYs"
            onPlaceSelected={getPlace}
            onKeyPress={handleKey}
            language="en"
            options={options}>{/* To use defaultValue with the stored value from the cookie */}</AutoComplete>
    )
}