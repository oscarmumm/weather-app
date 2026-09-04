import type { hourlyWeather } from '../types';
import {
    buildHourlyForecast,
    getDay,
    getTime,
    roundTemperature,
} from '../utils/dataFormat';

type HourlyWeatherSectionProps = {
    data?: hourlyWeather;
};

export const HourlyWeatherSection = ({ data }: HourlyWeatherSectionProps) => {
    const hourlyItems = data ? buildHourlyForecast(data) : [];

    // if (data) {
    //     console.log('Data: ', data);
    //     console.log('Hourly items: ', hourlyItems);
    // }

    return (
        <div className='border-2 border-amber-500 p-3 rounded-xl my-3'>
            <h2>Pronóstico por hora</h2>
            <ul className='flex overflow-auto glass rounded-xl mt-3'>
                {hourlyItems.map((el) => (
                    <li className='flex flex-col items-center p-3 min-w-18'>
                        <span>{el.temperature && roundTemperature(el.temperature)} °C</span>
                        {/* <span>Code: {el.weatherCode}</span> */}
                        <span>{`${getTime(el.time)}`}</span>
                        {/* <span>{`${getDay(el.time)}`}</span> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
