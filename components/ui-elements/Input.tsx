import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";
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
    type: HTMLInputTypeAttribute;
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

    const classNames = clsx(styles.Input, classes);

    return (
        <fieldset className={classNames}>
            {label && <label>{props.label}</label>}
            <input type={type} name={name}></input>
        </fieldset>
    )
}