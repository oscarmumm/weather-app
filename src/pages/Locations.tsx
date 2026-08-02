import { useSearchParams } from 'react-router';

export const Locations = () => {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    return (
        <div>
            <h2>Locations</h2>
            <p>lat = {lat}</p>
            <p>lon = {lon}</p>
        </div>
    );
};
