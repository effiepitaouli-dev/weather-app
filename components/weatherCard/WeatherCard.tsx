import clsx from 'clsx';
import styles from './WeatherCard.module.css';
interface WeatherCardProps {
    temperature: string;
    description?: string;
    classes?: string;
    type?: string;
    weatherObj?: {};
}

export function WeatherCard(props: WeatherCardProps) {
    let {
        temperature: temperature,
        description: description,
        classes: classes,
        type: type,
        ...otherProps
    } = props;

    let date, time;
    if (props.type == "current" && props.weatherObj.time) {
        [date, time] = props.weatherObj.time.split('T');
    }

    // On click new request for specific date 

    const classNames = clsx('u-flex', 'u-flex-column', styles.weatherCard, props.type && `${styles.weatherCard}--${props.type}`);

    return props.type && props.type == "current" ?
        <div className={classNames}>
            <div>Date: {date}</div>
            <div>Local time: {time}</div>
            <div>Timezone: {props.weatherObj.timezone}</div>
            <div>Location: {props.weatherObj.location}</div>
            <div className={styles["weatherCard__temperature"]}>{props.temperature}</div>
            <div className={styles["weatherCard__description"]}>{props.description}</div>
        </div>
        :

        <div className={classNames}>
            <div>Date: {props.weatherObj.date}</div>
            <div className={styles["weatherCard__temperature"]}>{props.temperature}</div>
        </div>
}