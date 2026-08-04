import { fetchWeatherApi } from 'openmeteo';

type fetchCurrentWeatherProps = {
    latitude: number;
    longitude: number;
};

export async function fetchCurrentWeather({
    latitude,
    longitude,
}: fetchCurrentWeatherProps) {
    const params = {
        latitude,
        longitude,
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'is_day',
            'precipitation',
            'rain',
            'wind_speed_10m',
            'wind_direction_10m',
            'surface_pressure',
            'cloud_cover',
            'weather_code',
            'showers',
            'snowfall',
            'pressure_msl',
            'wind_gusts_10m',
        ],
    };
    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    // const latitude = response.latitude();
    // const longitude = response.longitude();
    // const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    // console.log(
    //     `\nCoordinates: ${latitude}°N ${longitude}°E`,
    //     `\nElevation: ${elevation}m asl`,
    //     `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    // );

    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    return {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature_2m: current.variables(0)!.value(),
        relative_humidity_2m: current.variables(1)!.value(),
        apparent_temperature: current.variables(2)!.value(),
        is_day: current.variables(3)!.value(),
        precipitation: current.variables(4)!.value(),
        rain: current.variables(5)!.value(),
        wind_speed_10m: current.variables(6)!.value(),
        wind_direction_10m: current.variables(7)!.value(),
        surface_pressure: current.variables(8)!.value(),
        cloud_cover: current.variables(9)!.value(),
        weather_code: current.variables(10)!.value(),
        showers: current.variables(11)!.value(),
        snowfall: current.variables(12)!.value(),
        pressure_msl: current.variables(13)!.value(),
        wind_gusts_10m: current.variables(14)!.value(),
    };
}
