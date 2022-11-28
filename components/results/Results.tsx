import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Results.module.css';
import { WeatherCard } from '../weatherCard';
//import ReactDOM from 'react-dom';

// TO DO 
// Transfer the mapping in separate file ??

const weatherCodes = [
    { code: 0, description: "Clear sky" },
    { code: 1, description: "Mainly clear" },
    { code: 2, description: "Partly cloudy" },
    { code: 3, description: "Overcast" },
    { code: 45, description: "Fog" },
    { code: 48, description: "Depositing rime fog" },
    { code: 51, description: "Light drizzle" },
    { code: 53, description: "Moderate drizzle" }
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

    const [lat, lng, location] = props.coordinates;
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [timezone, setTimezone] = useState(null);
    const [time, setTime] = useState(null);
    const [days] = useState([]);

    //const WeatherCard = React.lazy(() => import('../weatherCard'));

    const classNames = clsx(
        'results__wrapper',
        isLoading && 'isLoading',
        props.classes,
    );

    useEffect(() => {
        if (props.hasLocation) {
            setLoading(true);
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=apparent_temperature_max,sunrise,sunset&current_weather=true&past_days=1&timezone=auto`)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setData({ ...res.current_weather, timezone: res.timezone, location: location });
                    handleData();

                    const length = res.daily.time.length;
                    const dates = res.daily;
                    clearDays();

                    for (let i = 0; i < length; i++) {
                        const obj = {};
                        obj.max_temperature = dates.apparent_temperature_max[i];
                        obj.sunset = dates.sunset[i];
                        obj.sunrise = dates.sunrise[i];
                        obj.date = dates.time[i];
                        days.push(obj);
                    }
                    setLoading(false);
                });
        }

    }, coordinates);

    function clearDays() {
        while (days.length) {
            days.pop();
        }
    }

    function renderContent() {
        if (props.hasLocation) {
            return isLoading ? 'Loading...' : formattedData
        } else {
            return 'Waiting for location input or use of geolocation';
        }
    }

    function handleData() {
        // To render primary Card
        if (data) {
            console.log(data);
            setTimezone(data.timezone);
            setTime(data.time.split('T')[1]);
        }
    }

    function findWeatherCode(code: number) {

        const obj = weatherCodes.filter(i => { i.code == code });
        console.log(obj);
        return obj.description;
    }

    return (
        <div className={classNames}>
            {/* {!props.hasLocation && 'Waiting for location input or use of geolocation'} */}
            <div className="grid">
                {/* <div aria-label='Timezone'>Timezone: {timezone}</div>
                <div aria-label={`Current time`}>Current time: {time}</div> */}

                {
                    data && <WeatherCard temperature={data.temperature} description={findWeatherCode(data.weathercode)} type="current" weatherObj={data}></WeatherCard>
                }

                <div className={styles.result} id="results">
                    {days.map(day => (
                        <WeatherCard temperature={day.max_temperature} weatherObj={day}></WeatherCard>
                    ))}
                </div>
            </div>
        </div >
    );
}
