import React, { useState } from "react";
import clsx from "clsx";
import styles from './Filters.module.css';
import { Input, Select } from "../ui-elements";

enum Position {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right'
}
interface FiltersProps {
    position: Position
}

export function Filters(props: FiltersProps) {
    let {
        position: position,
        ...otherProps
    } = props;

    const [hidden, setHidden] = useState(true);
    const classNames = clsx(styles.filters, styles[`filters--${props.position}`], styles['filters--hidden']);

    function toggleForm(e: any) {
        e.preventDefault();
        const btnParent = e.target.parentNode;
        btnParent.classList.toggle(styles['filters--hidden']);
        setHidden(!hidden);
        //btnParent.style.visibility = hidden ? 'visible' : 'hidden'
    }

    return (
        <form className={classNames} aria-label="Weather search filters">
            <div className={styles.formWrapper}>
                <h3>Filters</h3>
                <Input name="past-days" type="number" label="Past days"></Input>
                <Select name="days" label="Previous"></Select>
            </div>
            <button className={styles.filterBtn} onClick={(e: React.MouseEvent) => toggleForm(e)} aria-label="Show/hide filter form"></button>
        </form >
    );
}