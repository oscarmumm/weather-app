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
