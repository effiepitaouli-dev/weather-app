import React from "react";
//import clsx from 'clsx';
import styles from './UiElements.module.css';

export interface ButtonProps {
    text: string;
    click(): void;
}

export function Button(props: ButtonProps) {
    let {
        text: text,
        click: click,
        ...otherProps
    } = props;

    return (
        <button className={styles.button} onClick={props.click}>
            {props.text}
            {props.children}
        </button>
    );
}