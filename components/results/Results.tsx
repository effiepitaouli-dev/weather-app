import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Results.module.css';

export interface ResultsProps {
    classes?: string;
}

export function Results(props: ResultsProps) {
    let {
        classes: classes,
    } = props;

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const classNames = clsx(
        // styles.button,
        'results__wrapper',
        isLoading && 'isLoading',
        props.classes,
    );

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
            .then(res => res.json())
            .then(res => {
                setData(JSON.stringify(res));
                setLoading(false);
            });
    });

    return (
        <div className={classNames}>
            {isLoading ? 'Loading' : data}
        </div>
    );
}
