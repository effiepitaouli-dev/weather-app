import React, { useState, useEffect, ReactDOM } from 'react';
import clsx from 'clsx';
import styles from './Results.module.css';
import { WeatherCard } from '../weatherCard';

// TO DO 
// Transfer the mapping in separate file ??

const weatherCodes = [
    { code: 0, description: "Clear sky" },
    { code: 1, description: "Mainly clear" },
    { code: 2, description: "Partly cloudy" }
];
export interface ResultsProps {
    classes?: string;
    coordinates: string[];
    hasLocation: boolean;
}

export function Results(props: ResultsProps) {
    let {
        classes: classes,
        coordinates: coordinates,
        hasLocation: hasLocation,
        ...otherProps
    } = props;

    const [lat, lng] = props.coordinates;
    const [data, setData] = useState(null);
    const [formattedData, setFormattedData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [timezone, setTimezone] = useState(null);
    const [time, setTime] = useState(null);

    //const WeatherCard = React.lazy(() => import('../weatherCard'));

    const classNames = clsx(
        'results__wrapper',
        isLoading && 'isLoading',
        props.classes,
    );

    useEffect(() => {
        if (props.hasLocation) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=apparent_temperature_max,sunrise,sunset&current_weather=true&past_days=1&timezone=auto`)
                .then(res => res.json())
                .then(res => {
                    const formattedData = JSON.stringify(res, null, '\t');
                    console.log(res);
                    setData(res);
                    setFormattedData(formattedData);
                    setLoading(false);
                    handleData();
                });
        }

    }, coordinates);

    // useEffect(() => {
    //     handleData();
    // }, [data]);

    function renderContent() {
        if (props.hasLocation) {
            return isLoading ? 'Loading...' : formattedData
        } else {
            return 'Waiting for location input or use of geolocation';
        }
    }

    function handleData() {
        if (data) {
            setTimezone(data.timezone);
            setTime(data.current_weather.time.split('T')[1]);
            const results = document.getElementById('results');

            //ReactDOM.render(<WeatherCard temperature={data.current_weather.temperature} description={findWeatherCode(data.current_weather.weathercode)}></WeatherCard>, results);
        }
    }

    function findWeatherCode(code: number) {
        const obj = weatherCodes.filter(i => { i.code == code });
        console.log(obj);
        return JSON.stringify(obj);
    }

    return (
        <div className={classNames}>
            {/* {!props.hasLocation && 'Waiting for location input or use of geolocation'} */}
            <div className="grid">
                <div aria-label='Timezone'>Timezone: {timezone}</div>
                <div aria-label={`Current time`}>Current time: {time}</div>
            </div>
            {renderContent()}
            <div className={styles.result} id="results">
                {
                    data && <WeatherCard temperature={data.current_weather.temperature} description={findWeatherCode(data.current_weather.weathercode)}></WeatherCard>
                }
            </div>
        </div >
    );
}
