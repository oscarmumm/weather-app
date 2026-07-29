// example of geocoding API call:
// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json

type fetchLocationsProps = {
    name: string;
    count?: number;
    language?: string;
};

export async function fetchLocations({
    name,
    count = 10,
    language = 'en',
}: fetchLocationsProps) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=${count}&language=${language}&format=json`,
    );
    if (!res.ok) {
        throw new Error('Error al buscar localizaciones');
    }
    return res.json();
}
