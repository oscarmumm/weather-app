import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { fetchCurrentWeather } from '../services/weatherService';
import type { currentWeather } from '../types';

export const Weather = () => {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const [isLoading, setIsLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState<currentWeather>();

    useEffect(() => {
        if (!lat || !lon) return;
        console.log(`latitude: ${lat}. longitude: ${lon}`)
        const loadCurrentWeather = async () => {
            setIsLoading(true);

            try {
                const currentWeatherData = await fetchCurrentWeather({
                    latitude: Number(lat),
                    longitude: Number(lon),
                });
                console.log(currentWeatherData)
                setCurrentWeather(currentWeatherData);
            } catch (error) {
                console.error('Error al obtener los datos actuales del tiempo', error);
            } finally {
                setIsLoading(false);
            }
        };
        void loadCurrentWeather();
    }, [lat, lon]);

    return (
        <div>
            {isLoading && <p>Weather information is loading</p>}

            <p>Add location to favorites</p>
            <button>
                {/* location is not in favs list */}
                <MdFavoriteBorder />
                {/* location is in favs list */}
                <MdFavorite />
            </button>

            <h2>Weather</h2>
            <p>lat = {lat}</p>
            <p>lon = {lon}</p>
            <p>Temperatura: {currentWeather?.temperature_2m}</p>
            <p>Sensación térmica: {currentWeather?.apparent_temperature}</p>
            <p>Presión atmosférica: {currentWeather?.surface_pressure}</p>
        </div>
    );
};
