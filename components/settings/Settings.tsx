import React, { useEffect } from "react";
//import styles from './Settings.module.css';

export interface SettingsProps {
    theme(): void;
    dark?: string;
}

export function Settings(props: SettingsProps) {
    let {
        theme: theme,
        dark: dark,
        ...otherProps
    } = props;

    return (
        <div>
            <input id="dark-theme" type="checkbox" name="dark-theme" aria-label="Set dark theme" onClick={props.theme} defaultChecked={props.dark == 'dark'} />
        </div>
    )

}