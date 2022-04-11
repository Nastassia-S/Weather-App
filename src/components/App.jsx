import React from "react";
import {debounce} from "lodash";
import css from "./styles.module.css";
import {getCurrentWeather} from "../api";
import {LOAD_STATUSES} from "../constants";
import {Loader} from "./common";
import {WeatherTable} from "./WeatherTable";

export class App extends React.Component {
    state = {
        city: '',
        data: {},
        loadStatus: LOAD_STATUSES.UNKNOWN,
        // timer: 0,
    }

    // timerID = null;

    fetchWeather = (params) => {
        this.setState({loadStatus: LOAD_STATUSES.LOADING})

        getCurrentWeather(params)
            .then(({main, weather}) => {
                this.setState({loadStatus: LOAD_STATUSES.LOADED, data: {...main, icon: weather[0].icon}})
            }).catch(() => {
            this.setState({loadStatus: LOAD_STATUSES.ERROR, data: {}})
        });
    }

    fetchWeatherDebounced = debounce(this.fetchWeather, 1000);

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextState.city !== this.state.city || nextState.loadStatus !== this.state.loadStatus || nextState.data !== this.state.data;
    // }

    // componentDidMount() {
    //     this.fetchWeather({city: this.state.city});
    //     this.timerId = setInterval(() => {
    //     this.setState((prev) => ({timer: prev.timer + 1}))
    //     }, 1500);
    // }

    componentDidUpdate(_, prevState) {
        if (prevState.city !== this.state.city) {
            this.fetchWeatherDebounced({city: this.state.city})
        }
    }

    // componentWillUnmount() {
    //     if (this.timerID) {
    //         clearInterval(this.timerID);
    //     }
    // }

    render() {
        return <div className={css.weatherApp}>
            <h1 className={css.title}>Please enter a city</h1>
            <input className={css.input} placeholder={`Search for...`} value={this.state.city}
                   onChange={(event) => this.setState({city: event.target.value})}/>
            {this.state.loadStatus === LOAD_STATUSES.LOADING && <Loader/>}
            {this.state.loadStatus === LOAD_STATUSES.ERROR && <span className={css.error}>Please try again later</span>}
            {this.state.loadStatus === LOAD_STATUSES.LOADED && (
                <WeatherTable {...this.state.data}/>
            )}
        </div>
    }
}