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

    const classNames = clsx(styles.filters, styles[`filters--${props.position}`]);

    return (
        <form className={classNames}>
            <Input name="past-days" type="number" label="Past days"></Input>
            <Select name="days" label="Previous"></Select>
        </form>
    );
}