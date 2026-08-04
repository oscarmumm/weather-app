import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';

export const Weather = () => {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const [isLoading, setIsLoading] = useState(false);

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
        </div>
    );
};
