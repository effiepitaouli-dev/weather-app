import React, { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Results.module.css';
import { WeatherCard, weatherObj } from '../weatherCard';
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
    coordinates?: any[] | null;
}

export function Results(props: ResultsProps) {
    let {
        classes: classes,
        coordinates: coordinates,
        ...otherProps
    } = props;

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [days] = useState([]);

    const classNamesWrapper = clsx(
        styles['results__wrapper'],
        'results__wrapper', // Used for cypress
        'grid',
        isLoading && 'isLoading',
        props.classes,
    );

    const classNames = clsx(styles.results, 'results', 'grid');

    useEffect(() => {
        const [lat, lng, location] = props.coordinates;

        function clearDays() {
            while (days.length) {
                days.pop();
            }
        }

        if (lat && lng) {
            setLoading(true);
            (async () => {
                await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=apparent_temperature_max,sunrise,sunset&current_weather=true&past_days=1&timezone=auto`)
                    .then(res => res.json())
                    .then(res => {
                        if (!res.error) {
                            console.log(res);
                            const [currentDate, currentTime] = res.current_weather.time.split('T');
                            let currentIndex = -1;

                            const length = res.daily.time.length;
                            const dates = res.daily;
                            clearDays();

                            for (let i = 0; i < length; i++) {
                                const obj: weatherObj = {};
                                const [date, time] = dates.time[i].split('T');
                                obj.max_temperature = dates.apparent_temperature_max[i];
                                obj.sunset = dates.sunset[i].split('T')[1];
                                obj.sunrise = dates.sunrise[i].split('T')[1];
                                obj.date = date;
                                obj.future = date > currentDate;

                                // Update current 

                                if (currentDate == date) {
                                    currentIndex = i;
                                } else {
                                    days.push(obj);
                                }
                            }

                            setData({ ...res.current_weather, ...days[currentIndex], time: currentTime, /*date: currentDate, */ timezone: res.timezone, location: location });

                        } else {
                            console.log(res.error);
                        }
                    });
                setLoading(false);
            })();

        }
    }, [props.coordinates[0], props.coordinates[1]]);

    // function renderContent() {
    //     if (props.hasLocation) {
    //         return isLoading ? 'Loading...' : formattedData
    //     } else {
    //         return 'Waiting for location input or use of geolocation';
    //     }
    // }

    function findWeatherCode(code: number) {
        const obj = weatherCodes.find(i => i.code == code);
        return obj && obj['description'];
    }

    return (
        <div className={classNamesWrapper}>
            {
                data && <WeatherCard key={data.time} temperature={data.temperature} description={findWeatherCode(data.weathercode)} type="current" weatherObj={data}></WeatherCard>
            }

            <div className={classNames} id="results">
                {days.map(day => (
                    <WeatherCard key={day.date} temperature={day.max_temperature} weatherObj={day} type="default"></WeatherCard>
                ))}
            </div>
        </div >
    );
}
