import React from "react";
import css from "./styles.module.css";

export class WeatherTable extends React.Component {
    render() {
        return (
            <ul className={css.table}>
                <li className={css.item}>
                    Current temperature: {Math.floor(this.props.temp)}°C
                    <img src={`http://openweathermap.org/img/wn/${this.props.icon}.png`}/>
                </li>
                <li className={css.item}>Feels like: {this.props.feels_like}°C</li>
                <li className={css.item}>Min temperature: {Math.floor(this.props.temp_min)}°C</li>
                <li className={css.item}>Max temperature: {Math.floor(this.props.temp_max)}°C</li>
            </ul>
        );
    }
}