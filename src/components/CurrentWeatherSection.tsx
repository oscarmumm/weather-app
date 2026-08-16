import type { currentWeather } from '../types';

type CurrentWeatherSectionProps = {
    data?: currentWeather;
};

export const CurrentWeatherSection = ({ data }: CurrentWeatherSectionProps) => {
    console.log('Current: ', data);
    const temperature_2m = data?.temperature_2m ?? 0;
    const apparent_temperature = data?.apparent_temperature ?? 0;
    const temperature = Math.round(temperature_2m * 10) / 10;
    const feels_like = Math.round(apparent_temperature * 10) / 10;

    return (
        <div>
            <h2>Current Weather Section</h2>
            <p>Temperatura: {temperature} °C</p>
            <p>ST: {feels_like} °C</p>
        </div>
    );
};
