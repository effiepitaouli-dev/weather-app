import clsx from 'clsx';
import { useState } from 'react';
import styles from './WeatherCard.module.css';

export interface weatherObj {
    time?: string;
    sunset?: string;
    sunrise?: string;
    future?: boolean;
    winddirection?: number;
    windspeed?: number;
    date?: string;
    max_temperature?: number;
}
interface WeatherCardProps {
    temperature: string;
    description?: string;
    classes?: string;
    type: 'current' | 'default';
    weatherObj?: weatherObj;
}

export function WeatherCard(props: WeatherCardProps) {
    let {
        temperature: temperature,
        description: description,
        classes: classes,
        type: type,
        weatherObj: weatherObj,
        ...otherProps
    } = props;

    const [expanded, setExpanded] = useState(type == "current" ? true : false);
    let timeClass = undefined;
    if (type == "current" && weatherObj) {
        // String comparison works because the time is normalized
        timeClass = weatherObj.time > weatherObj.sunset || weatherObj.time < weatherObj.sunrise ? 'night' : 'day'
    }

    // On click new request for specific date 

    const classNames = clsx(
        'u-flex',
        'u-flex-column',
        type == "current" && styles[`weatherCard--${timeClass}`],
        styles.weatherCard,
        styles[`weatherCard--${type}`],
        type == "default" && weatherObj && weatherObj.future && styles[`weatherCard--future`],
        expanded && 'isExpanded',
        classes
    );

    function handleClick() {
        if (!expanded) {
            // Handle request for additional data
            console.log('Wait for additional information for card with date: ' + weatherObj?.date);
        }
        setExpanded(!expanded);
    }

    return (weatherObj &&

        <article className={classNames} tabIndex={type == "current" ? -1 : 0} onClick={handleClick}>
            <div>Date: {weatherObj.date}</div>
            <div className={styles["weatherCard__temperature"]}>{temperature}</div>
            {type && type == "current" &&
                <>
                    <div className={styles["weatherCard__description"]}>{description}</div>
                    <div className={styles["weatherCard__wind"]}>{weatherObj.winddirection} {weatherObj.windspeed}</div>
                </>
            }
        </article>
    )
}