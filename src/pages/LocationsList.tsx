import type { Location } from '../types';
import { NavLink, useLocation } from 'react-router';

export const LocationsList = () => {
    const locationsData = useLocation()
    const list = locationsData.state;
    return (
        <div>
            <h2>Locations list</h2>
            <ul>
                {list.map((location: Location) => (
                    <li key={location.id} className='p-3'>
                        <NavLink
                            to={`/locations/${location.id}?lat=${location.latitude}&lon=${location.longitude}`}
                        >
                            {location.name}, {location.country}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};
