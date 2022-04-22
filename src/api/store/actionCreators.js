import {WEATHER_ACTIONS} from "./constants";
import {getCurrentWeather} from "../weather";


export const fetchStart = () => ({type: WEATHER_ACTIONS.fetchStart});
export const fetchError = () => ({type: WEATHER_ACTIONS.fetchError});
export const fetchSuccess = (weather) => ({
    payload: weather,
    type: WEATHER_ACTIONS.fetchSuccess
});

export const fetchWeather = (city) => {
    return async (dispatch) => {
        try {
            dispatch(fetchStart());
            const weather = await getCurrentWeather(city);
            dispatch(fetchSuccess(weather.main));
        } catch {
            dispatch(fetchError());
        }
    };
};