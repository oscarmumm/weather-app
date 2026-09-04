import type { hourlyWeather, dailyWeather } from '../types';

export const getTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes === 0) {
        return `${hours}:${minutes}0`;
    }
    return `${hours}:${minutes}`;
};

export const getDay = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    return `${day}/${month}`;
};

export const roundTemperature = (n: number) => {
    return Math.round(n);
};

export const buildHourlyForecast = (data: hourlyWeather) =>
    data.time.slice(0, 24).map((time, index) => ({
        time,
        temperature: data.temperature_2m?.[index],
        precipitationProbability: data.precipitation_probability?.[index],
        weatherCode: data.weather_code?.[index],
    }));

export const buildDailyForecast = (data: dailyWeather) => 
    data.time.map((time, index) => ({
        time,
        temperatureMin: data.temperature_2m_min?.[index],
        temperatureMax: data.temperature_2m_max?.[index],
        weatherCode: data.weather_code?.[index],
    }))
