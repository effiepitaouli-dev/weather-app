import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Autocomplete } from "../autocomplete";
import Cookies from 'universal-cookie';
import styles from './Location.module.css';

export interface LocationProps {
    classes?: string;
    handlePlace(coors: string, place: string): void;
}

export function Location(props: LocationProps) {
    let {
        classes: classes,
        handlePlace: handlePlace,
        ...otherProps
    } = props;

    const classNames = clsx(styles.location, 'grid', props.classes);
    const cookies = new Cookies();

    useEffect(() => {
        const button = document.getElementById("geolocation-button");
        // If browser not supports geolocation, hide the relative button
        // Check navigator permissions
        if (!navigator.geolocation && button) {
            button.hidden = true;
            button.style.display = 'none';
        }

        const location = cookies.get('location');
        const coords = cookies.get('coordinates');
        if (location && coords) props.handlePlace(coords, location);

    }, []);

    function useGeolocation(e: any) {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition((position) => {
            const str = `${position.coords.latitude},${position.coords.longitude}`;
            cookies.set('coordinates', str, { path: '/', maxAge: 1000000 });

            const geocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=locality&language=en&key=AIzaSyBA10k4Go8Xy1OUV2fHVkmEIBwmCQ5FyYs`;

            fetch(geocoding)
                .then((response) => response.json())
                .then((response) => {
                    const loc = response.results[0].formatted_address;
                    cookies.set('location', loc);
                    handlePlaceChange(str, loc);
                })
                .catch((error) => {
                    alert(error);
                });
        });
    }

    function handlePlaceChange(coords: string, location: string) {
        props.handlePlace(coords, location);
    }

    return (
        <form className={classNames}>
            <Autocomplete handlePlaceChange={handlePlaceChange}></Autocomplete>
            <div>or</div>
            <button id="geolocation-button" onClick={useGeolocation}>Use my current location</button>
        </form>
    );
}