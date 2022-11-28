import clsx from "clsx";
import styles from './UiElements.module.css';

enum InputType {
    "text",
    "number",
    "checkbox",
    "date",
    "time"
}

export interface InputProps {
    label?: string;
    name: string;
    type: InputType;
    placeholder?: string;
    classes?: string;
}

export function Input(props: InputProps) {
    let {
        label: label,
        name: name,
        type: type,
        placeholder: placeholder,
        classes: classes,
        ...otherProps
    } = props;

    const classNames = clsx(styles.Input, props.classes);

    return (
        <fieldset className={classNames}>
            {props.label && <label>{props.label}</label>}
            <input type={props.type} name={props.name}></input>
        </fieldset>
    )
}