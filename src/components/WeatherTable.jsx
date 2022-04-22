import css from "./styles.module.css";

export const WeatherTable = ({values}) => {
    return (
        <ul className={css.table}>{values.map(({label, value}) =>
            <li className={css.item}>{label}: {value}</li>)}
        </ul>
    );
}