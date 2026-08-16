import type { dailyWeather } from '../types';

type DailyWeatherSectionProps = {
    data?: dailyWeather;
};

export const DailyWeatherSection = ({ data }: DailyWeatherSectionProps) => {
    console.log('Daily: ', data);
    return (
        <div>
            <h2>Daily Weather Section</h2>
        </div>
    );
};
