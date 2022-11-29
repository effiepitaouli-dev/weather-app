interface SelectProps {
    label?: string;
    name: string;
}

export function Select(props: SelectProps) {
    let {
        label: label,
        name: name,
        ...otherProps
    } = props;

    return (
        <fieldset>
            {props.label && <label>{props.label}</label>}
            <select name={props.name}>

            </select>
        </fieldset>
    )
}