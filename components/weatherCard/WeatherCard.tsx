import clsx from 'clsx';
import styles from './WeatherCard.module.css';
interface WeatherCardProps {
    temperature: string;
    description: string;
    classes?: string;
    type?: string;
}

export function WeatherCard(props: WeatherCardProps) {
    let {
        temperature: temperature,
        description: description,
        classes: classes,
        type: type,
        ...otherProps
    } = props;

    const classNames = clsx('u-flex', 'u-flex-column', styles.weatherCard);
    return (
        <div className={classNames}>
            <div className={styles["weatherCard__temperature"]}>{props.temperature}</div>
            <div className={styles["weatherCard__description"]}>{props.description}</div>
        </div>
    )
}