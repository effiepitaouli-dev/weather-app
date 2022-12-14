import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import styles from './Results.module.css';
import { WeatherCard, weatherObj } from '../weatherCard';
import { useFetch } from '../../hooks';
import { CoordsContext } from '../../pages/index';

// TO DO 
// Transfer the mapping in separate file ??

const weatherCodes = [
    { code: 0, description: "Clear sky", imageUrl: '/weather-sun.svg' },
    { code: 1, description: "Mainly clear", imageUrl: '/weather-clouds.svg' },
    { code: 2, description: "Partly cloudy", imageUrl: '/weather-clouds-many.svg' },
    { code: 3, description: "Overcast", imageUrl: "/weather-windy.svg" },
    { code: 45, description: "Fog", imageUrl: null },
    { code: 48, description: "Depositing rime fog", imageUrl: null },
    { code: 51, description: "Light drizzle", imageUrl: '/weather-drop.svg' },
    { code: 53, description: "Moderate drizzle", imageUrl: '/weather-drop.svg' },
    { code: 55, description: "Dense intensity drizzle", imageUrl: '/weather-rain.svg' },
    { code: 56, description: "Light Freezing drizzle", imageUrl: '/weather-drop.svg' },
    { code: 57, description: "Dense Freezing drizzle", imageUrl: '/weather-rain.svg' },
    { code: 61, description: "Slight rain", imageUrl: '/weather-drop.svg' },
    { code: 63, description: "Moderate rain", imageUrl: '/weather-rain.svg' },
    { code: 65, description: "Heavy rain", imageUrl: '/weather-rain.svg' },
    { code: 66, description: "Light freezing rain", imageUrl: '/weather-rain.svg' },
    { code: 67, description: "Heavy freezing rain", imageUrl: '/weather-rain.svg' },
    { code: 71, description: "Slight snow fall", imageUrl: '/weather-snowflake.svg' },
    { code: 73, description: "Moderate snow fall", imageUrl: '/weather-snow.svg' },
    { code: 75, description: "Heavy snow fall", imageUrl: '/weather-snow.svg' },
    { code: 77, description: "Snow grains", imageUrl: '/weather-snow.svg' },
    { code: 80, description: "Slight rain showers", imageUrl: '/weather-rain.svg' },
    { code: 81, description: "Moderate rain showers", imageUrl: '/weather-rain.svg' },
    { code: 82, description: "Heavy rain showers", imageUrl: '/weather-rain.svg' },
    { code: 85, description: "Slight snow showers", imageUrl: '/weather-snow.svg' },
    { code: 86, description: "Heavy snow showers", imageUrl: '/weather-snow.svg' },
    { code: 95, description: "Slight or moderate thunderstom", imageUrl: '/weather-storm.svg' },
    { code: 96, description: "Slight hail thunderstorm", imageUrl: '/weather-storm.svg' },
    { code: 99, description: "Heavy hail thunderstorm", imageUrl: '/weather-storm.svg' }
];
export interface ResultsProps {
    classes?: string;
}

export function Results(props: ResultsProps) {
    let {
        classes: classes,
        ...otherProps
    } = props;

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [days] = useState([]);
    const [lat, lng, location] = useContext(CoordsContext).coords;

    const classNamesWrapper = clsx(
        styles['results__wrapper'],
        'results__wrapper', // Used for cypress
        'grid',
        isLoading && 'isLoading',
        classes,
    );

    const classNames = clsx(styles.results, 'results', 'grid');

    const fetch = useFetch(`&daily=apparent_temperature_max,sunrise,sunset&current_weather=true&past_days=1&timezone=auto`);

    function clearDays() {
        while (days.length) {
            days.pop();
        }
    }

    useEffect(() => {
        fetch().then((response) => {
            if (response) {
                console.log(response);
                setLoading(true);
                const [currentDate, currentTime] = response.current_weather.time.split('T');
                let currentIndex = -1;

                const length = response.daily.time.length;
                const dates = response.daily;
                clearDays();

                for (let i = 0; i < length; i++) {
                    const obj: weatherObj = { index: i };
                    const [date] = dates.time[i].split('T');
                    obj.max_temperature = dates.apparent_temperature_max[i];
                    obj.sunset = dates.sunset[i].split('T')[1];
                    obj.sunrise = dates.sunrise[i].split('T')[1];
                    obj.date = date;
                    obj.future = date > currentDate;
                    days.push(obj);

                    // Update current 

                    if (currentDate == date) {
                        currentIndex = i;
                    }
                }
                const weather = findWeather(response.current_weather.weathercode);

                setData({ ...response.current_weather, ...days[currentIndex], index: currentIndex, time: currentTime, timezone: response.timezone_abbreviation, location: location, description: weather.description, imageurl: weather['imageUrl'] });
                setLoading(false);
            }
        });

    }, [lat, lng, days]);

    function findWeather(code: number) {
        const obj = weatherCodes.find(i => i.code == code);
        return obj;
    }

    function requestData(obj: object) {
        //To call api for specific date and update weatherObj
        return days[obj.index];
    }

    return (
        <section className={classNamesWrapper} {...otherProps}>
            {
                data && days.length && <>
                    {
                        data.location && data.time &&
                        <div className="underline mb-0">It is currently {data.time} <span>({data.timezone})</span> on {data.location}</div>
                    }
                    <div className={classNames} id="results">
                        <WeatherCard key={data.index} classes={`${styles.result} ${styles['result--current']}`} temperature={data.temperature} description={data.description} style={{ '--bgImage': `url('${data.imageurl}')` }} type="current" weatherObj={data}></WeatherCard>
                        {days.map(day => (
                            day.index != data.index && <WeatherCard key={day.index} classes={styles.result} temperature={day.max_temperature} weatherObj={day} type="default"></WeatherCard>
                        ))}
                    </div>
                </>
            }
        </section >
    );
}
