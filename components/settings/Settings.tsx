import React, { KeyboardEventHandler } from "react";
import styles from './Settings.module.css';
import clsx from "clsx";

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

    const classes = clsx('u-flex', styles.settingsWrapper);

    const keypressHandler: KeyboardEventHandler = function (e: KeyboardEvent) {
        if (e.key == "Enter") {
            theme();
        }
    }

    return (
        <div className={classes} role="toolbar">
            <input
                id="dark-theme"
                className={styles.themeCheckbox}
                type="checkbox"
                name="dark-theme"
                aria-label="Set dark theme"
                onClick={props.theme}
                onKeyDown={keypressHandler}
                defaultChecked={props.dark == 'dark'}
            />
        </div>
    )

}