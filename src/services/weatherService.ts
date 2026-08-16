import { fetchWeatherApi } from 'openmeteo';

type fetchWeatherDataProps = {
    latitude: number;
    longitude: number;
};

export async function fetchWeatherData({
    latitude,
    longitude,
}: fetchWeatherDataProps) {
    const params = {
        latitude,
        longitude,
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'uv_index_clear_sky_max',
            'uv_index_max',
            'sunrise',
            'sunset',
            'precipitation_probability_max',
        ],
        hourly: ['temperature_2m', 'precipitation_probability', 'weather_code'],
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'is_day',
            'precipitation',
            'rain',
            'showers',
            'snowfall',
            'pressure_msl',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m',
            'weather_code',
            'cloud_cover',
            'surface_pressure',
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
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const sunrise = daily.variables(5)!;
    const sunset = daily.variables(6)!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    return {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            relative_humidity_2m: current.variables(1)!.value(),
            apparent_temperature: current.variables(2)!.value(),
            is_day: current.variables(3)!.value(),
            precipitation: current.variables(4)!.value(),
            rain: current.variables(5)!.value(),
            showers: current.variables(6)!.value(),
            snowfall: current.variables(7)!.value(),
            pressure_msl: current.variables(8)!.value(),
            wind_speed_10m: current.variables(9)!.value(),
            wind_direction_10m: current.variables(10)!.value(),
            wind_gusts_10m: current.variables(11)!.value(),
            weather_code: current.variables(12)!.value(),
            cloud_cover: current.variables(13)!.value(),
            surface_pressure: current.variables(14)!.value(),
        },
        hourly: {
            time: Array.from(
                {
                    length:
                        (Number(hourly.timeEnd()) - Number(hourly.time())) /
                        hourly.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(hourly.time()) +
                            i * hourly.interval() +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
            precipitation_probability: hourly.variables(1)!.valuesArray(),
            weather_code: hourly.variables(2)!.valuesArray(),
        },
        daily: {
            time: Array.from(
                {
                    length:
                        (Number(daily.timeEnd()) - Number(daily.time())) /
                        daily.interval(),
                },
                (_, i) =>
                    new Date(
                        (Number(daily.time()) +
                            i * daily.interval() +
                            utcOffsetSeconds) *
                            1000,
                    ),
            ),
            weather_code: daily.variables(0)!.valuesArray(),
            temperature_2m_max: daily.variables(1)!.valuesArray(),
            temperature_2m_min: daily.variables(2)!.valuesArray(),
            uv_index_clear_sky_max: daily.variables(3)!.valuesArray(),
            uv_index_max: daily.variables(4)!.valuesArray(),
            // Map Int64 values to according structure
            sunrise: [...Array(sunrise.valuesInt64Length())].map(
                (_, i) =>
                    new Date(
                        (Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) *
                            1000,
                    ),
            ),
            // Map Int64 values to according structure
            sunset: [...Array(sunset.valuesInt64Length())].map(
                (_, i) =>
                    new Date(
                        (Number(sunset.valuesInt64(i)) + utcOffsetSeconds) *
                            1000,
                    ),
            ),
            precipitation_probability_max: daily.variables(7)!.valuesArray(),
        },
    };
}
