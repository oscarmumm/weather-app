import type { hourlyWeather } from '../types';

type HourlyWeatherSectionProps = {
    data?: hourlyWeather;
};

export const HourlyWeatherSection = ({ data }: HourlyWeatherSectionProps) => {
    console.log('Hourly: ',data)
    return (
        <div>
            <h2>Horly Weather Section</h2>
        </div>
    );
};
