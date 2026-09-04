export const WeatherIcon = (weatherCondition: string) => {
    return <img src={weatherCondition} alt={`${weatherCondition}-icon`} />;
};
