export type Location = {
    id: number;
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
};

export type currentWeather = {
    apparent_temperature: number;
    cloud_cover: number;
    is_day: number;
    precipitation: number;
    pressure_msl: number;
    rain: number;
    relative_humidity_2m: number;
    showers: number;
    snowfall: number;
    surface_pressure: number;
    temperature_2m: number;
    time: Date;
    weather_code: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    wind_speed_10m: number;
};

export type hourlyWeather = {
    time: Date[];
    temperature_2m: Float32Array | null;
    precipitation_probability: Float32Array | null;
    weather_code: Float32Array | null;
};

export type dailyWeather = {
    precipitation_probability_max: Float32Array | null;
    sunrise: Date[];
    sunset: Date[];
    temperature_2m_max: Float32Array | null;
    temperature_2m_min: Float32Array | null;
    time: Date[];
    uv_index_clear_sky_max: Float32Array | null;
    uv_index_max: Float32Array | null;
    weather_code: Float32Array | null;
};
