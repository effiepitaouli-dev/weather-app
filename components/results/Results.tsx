import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Results.module.css';
import { lazy } from 'react'; // For using while rendering results

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
    const [isLoading, setLoading] = useState(true);

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
                    setData(formattedData);
                    setLoading(false);
                });
        }

    }, coordinates);

    function renderContent() {
        if (props.hasLocation) {
            return isLoading ? 'Loaging...' : data
        } else {
            return 'Waiting for location input or use of geolocation';
        }
    }

    return (
        <div className={classNames}>
            {/* {!props.hasLocation && 'Waiting for location input or use of geolocation'} */}
            {renderContent()}
        </div>
    );
}
