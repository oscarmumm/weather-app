import type { dailyWeather } from '../types';
import {
    buildDailyForecast,
    getDay,
    roundTemperature,
} from '../utils/dataFormat';

type DailyWeatherSectionProps = {
    data?: dailyWeather;
};

export const DailyWeatherSection = ({ data }: DailyWeatherSectionProps) => {
    console.log('Daily: ', data);
    const dailyItems = data ? buildDailyForecast(data) : [];

    return (
        <div className="border-2 border-amber-500 p-3 rounded-xl my-3">
            <h2>Próximos 7 días</h2>
            <ul className="flex flex-col items-center rounded-xl p-3 mt-3 glass">
                {dailyItems.map((el) => (
                    <li className="w-full grid grid-cols-3 p-3">
                        <span>{getDay(el.time)}</span>
                        <span className='justify-self-center'>{el.weatherCode}</span>
                        <span className="justify-self-end">
                            {`${
                                el.temperatureMin &&
                                roundTemperature(el.temperatureMin)
                            }
                            ° / ${
                                el.temperatureMax &&
                                roundTemperature(el.temperatureMax)
                            }`}
                            °
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
