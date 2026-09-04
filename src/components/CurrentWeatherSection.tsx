import type { currentWeather } from '../types';
import { roundTemperature } from '../utils/dataFormat';
import { getWeatherCondition } from '../utils/getWeatherCondition';

type CurrentWeatherSectionProps = {
    data?: currentWeather;
};

export const CurrentWeatherSection = ({ data }: CurrentWeatherSectionProps) => {
    // console.log('Ahora (current): ', data);
    const temperature_2m = data?.temperature_2m ?? 0;
    const apparent_temperature = data?.apparent_temperature ?? 0;
    const temperature = roundTemperature(temperature_2m);
    const feels_like = roundTemperature(apparent_temperature);
    const weatherCondition = data && getWeatherCondition(data.weather_code);

    return (
        <div className='border-2 border-amber-500 p-3 rounded-xl my-3 glass'>
            <h2>Ahora</h2>
            <p>{temperature}°</p>
            <p>Ícono del clima</p>
            <p>Descripción del clima: {weatherCondition?.description}</p>
            <p>Sensación Térmica: {feels_like}°</p>
        </div>
    );
};
