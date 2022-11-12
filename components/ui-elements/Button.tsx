import React from "react";
import clsx from 'clsx';
import { createPublicKey } from "crypto";
//import styles from './Button.module.css';

export interface ButtonProps {
    text: string;
    click: Function;
}

export function Button(props: ButtonProps) {
    let {
        text: text,
        click: click,
        ...otherProps
    } = props;

    return (
        <button>
            {props.text}
        </button>
    );
}