import React from "react";
import {debounce} from "lodash";
import css from "./styles.module.css";
import {Loader} from "./common";
import {WeatherTable} from "./WeatherTable";
import {connect} from "react-redux";
import {WeatherSelectors, WeatherAC} from "../api/store";

export class AppOriginal extends React.Component {
    state = {
        city: '',
    };

    fetchWeatherDebounced = debounce(this.props.getWeather, 1000);

    //
    // componentDidMount() {
    //     this.props.getWeather(this.state.city);
    // }

    componentDidUpdate(_, prevState) {
        if (prevState.city !== this.state.city) {
            this.fetchWeatherDebounced({city: this.state.city})
        }
    }

    render() {
        const {city} = this.state;
        const values = [
            {label: "Current temperature", value: `${this.props.data.temp} °C`},
            {label: "Feels like", value: `${this.props.data.feels_like} °C`},
            {label: "Min temperature", value: `${this.props.data.temp_min} °C`},
            {label: "Max temperature", value: `${this.props.data.temp_max} °C`},
        ];
        const {isLoading, isLoaded, isError} = this.props;

        return (
            <div className={css.weatherApp}>
                <h1 className={css.title}>Please enter a city</h1>
                <input className={css.input} placeholder={`Search for...`} value={city}
                       onChange={(event) => this.setState({city: event.target.value})}/>
                {isLoading && <Loader/>}
                {isError && <span className={css.error}>Please try again later</span>}
                {isLoaded && <WeatherTable values={values}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: WeatherSelectors.getWeather(state),
        isLoading: WeatherSelectors.isLoading(state),
        isLoaded: WeatherSelectors.isLoaded(state),
        isError: WeatherSelectors.isError(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    getWeather: (city) => dispatch(WeatherAC.fetchWeather(city)),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppOriginal);