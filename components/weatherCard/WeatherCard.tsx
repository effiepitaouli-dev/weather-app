import clsx from 'clsx';
import { useState } from 'react';
import styles from './WeatherCard.module.css';

export interface weatherObj {
    index: number;
    time?: string;
    sunset?: string;
    sunrise?: string;
    future?: boolean;
    winddirection?: number;
    windspeed?: number;
    date?: string;
    max_temperature?: number;
    imageurl?: string;
}
interface WeatherCardProps {
    temperature: string;
    description?: string;
    classes?: string;
    type: 'current' | 'default';
    weatherObj: weatherObj;
    requestData?(e: weatherObj): void;
    style?: {};
};

export function WeatherCard(props: WeatherCardProps) {
    let {
        temperature: temperature,
        description: description,
        classes: classes,
        type: type,
        weatherObj: weatherObj,
        requestData: requestData,
        style: style,
        ...otherProps
    } = props;

    const [expanded, setExpanded] = useState(type == "current" ? true : false);
    let timeClass = undefined;

    if (requestData) otherProps = { ...otherProps, tabIndex: type == "current" ? -1 : 0, onClick: handleClick };

    if (style) otherProps = { ...otherProps, style: style };

    if (type == "current") {
        // String comparison works because the time is normalized
        timeClass = weatherObj.time > weatherObj.sunset || weatherObj.time < weatherObj.sunrise ? 'night' : 'day'
    }

    // On click new request for specific date 

    const classNames = clsx(
        'grid',
        type == "current" && styles[`weatherCard--${timeClass}`],
        type,
        styles.weatherCard,
        styles[`weatherCard--${type}`],
        type == "default" && weatherObj.future && styles[`weatherCard--future`],
        expanded && 'isExpanded',
        classes
    );

    function handleClick() {
        if (!expanded) {
            // Handle request for additional data
            // Description, wind info, image and animation
            console.log('Wait for additional information for card with date: ' + weatherObj?.date);
        }
        setExpanded(!expanded);
        requestData && requestData(weatherObj);
    }

    // Compute date
    const day = weatherObj && weatherObj.date.split('-')[2];
    const date = new Date(weatherObj.date);
    const month = date.toLocaleString('default', { month: 'short' });

    return (
        <article className={classNames} {...otherProps}>
            <div className={styles["weatherCard__date"]}><span className="u-flex">{month} {day}</span></div>
            <div className={`${styles["weatherCard__temperature"]} u-flex`} aria-label="Current temperature" role="log">{temperature}</div>
            {type && type == "current" &&
                <>
                    <div className={styles["weatherCard__description"]}><span>{description}</span></div>
                    <div className={`${styles["weatherCard__wind"]} u-flex u-flex-column`} aria-label="Wind information" data-title="Wind:">
                        <span className="underline u-block">About the wind</span>
                        <span className="u-block">Direction: {weatherObj.winddirection}</span>
                        <span className="u-block">Speed: {weatherObj.windspeed}</span>
                    </div>
                </>
            }
        </article>
    )
}