import clsx from 'clsx';
import styles from './WeatherCard.module.css';

export interface weatherObj {
    time?: string;
    sunset?: string;
    sunrise?: string;
    future?: boolean;
    winddirection?: number;
    windspeed?: number;
    timezone?: string;
    date?: string;
    location?: string;
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
        ...otherProps
    } = props;

    let timeClass = undefined;
    if (props.type == "current") {
        // String comparison works because the time is normalized
        timeClass = props.weatherObj && props.weatherObj.time > props.weatherObj.sunset ? 'night' : 'day'
    }

    // On click new request for specific date 

    const classNames = clsx(
        'u-flex',
        'u-flex-column',
        props.type == "current" && styles[`weatherCard--${timeClass}`],
        styles.weatherCard,
        styles[`weatherCard--${props.type}`],
        props.type == "default" && props.weatherObj && props.weatherObj.future && styles[`weatherCard--future`]
    );

    return props.type && props.type == "current" ?
        <div>
            {props.weatherObj &&
                <>
                    <div>It is currently {props.weatherObj.time} on {props.weatherObj.location}</div>
                    <div>Timezone: {props.weatherObj.timezone}</div>
                    <div className={classNames}>
                        <div>Date: {props.weatherObj.date}</div>


                        <div className={styles["weatherCard__temperature"]}>{props.temperature}</div>
                        <div className={styles["weatherCard__description"]}>{props.description}</div>
                        <div className={styles["weatherCard__wind"]}>{props.weatherObj.winddirection} {props.weatherObj.windspeed}</div>
                    </div>
                </>
            }

        </div>
        :

        props.weatherObj &&
        <div className={classNames}>
            <div>Date: {props.weatherObj.date}</div>
            <div className={styles["weatherCard__temperature"]}>{props.temperature}</div>
        </div>
}