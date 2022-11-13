import { useEffect, useState } from "react";
import { Autocomplete } from "../autocomplete";
import Cookies from 'universal-cookie';

export function Location(props) {
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
                    handlePlace(str, loc);
                })
                .catch((error) => {
                    alert(error);
                });
        });
    }

    function handlePlace(coords: string, location: string) {
        props.handlePlace(coords, location);
    }

    return (
        <form>
            <Autocomplete handlePlace={handlePlace}></Autocomplete>
            <button id="geolocation-button" onClick={useGeolocation}>Use my current location</button>
        </form>
    );
}