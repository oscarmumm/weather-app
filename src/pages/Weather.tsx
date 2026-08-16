import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { fetchWeatherData } from '../services/weatherService';
import type { currentWeather } from '../types';
import type { dailyWeather } from '../types';
import type { hourlyWeather } from '../types';
import { motion } from 'motion/react';
import { getWeatherCondition } from '../utils/getWeatherCondition';
import { CurrentWeatherSection } from '../components/CurrentWeatherSection';
import { DailyWeatherSection } from '../components/DailyWeatherSection';
import { HourlyWeatherSection } from '../components/HourlyWeatherSection';

export const Weather = () => {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const [isLoading, setIsLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState<currentWeather>();
    const [hourlyWeather, setHourlyWeather] = useState<hourlyWeather>();
    const [dailyWeather, setDailyWeather] = useState<dailyWeather>();

    useEffect(() => {
        if (!lat || !lon) return;
        console.log(`latitude: ${lat}. longitude: ${lon}`);
        const loadCurrentWeather = async () => {
            setIsLoading(true);

            try {
                const weatherData = await fetchWeatherData({
                    latitude: Number(lat),
                    longitude: Number(lon),
                });
                setCurrentWeather(weatherData.current);
                setHourlyWeather(weatherData.hourly);
                setDailyWeather(weatherData.daily);
            } catch (error) {
                console.error(
                    'Error al obtener los datos actuales del tiempo',
                    error,
                );
            } finally {
                setIsLoading(false);
            }
        };
        void loadCurrentWeather();
    }, [lat, lon]);

    return (
        <div>
            {isLoading ? (
                <p>Weather information is loading</p>
            ) : (
                <motion.div>
                    <p>Add location to favorites</p>
                    <button>
                        {/* location is not in favs list */}
                        <MdFavoriteBorder />
                        {/* location is in favs list */}
                        <MdFavorite />
                    </button>
                    <CurrentWeatherSection data={currentWeather} />
                    <DailyWeatherSection data={dailyWeather} />
                    <HourlyWeatherSection data={hourlyWeather} />
                </motion.div>
            )}
        </div>
    );
};
