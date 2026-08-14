import type { Location } from '../types';
import { NavLink, useLocation } from 'react-router';
import { MdLocationPin } from 'react-icons/md';

export const LocationsList = () => {
    const locationsData = useLocation();
    const list = locationsData.state;
    return (
        <div>
            <h2 className='p-3'>Resultados de la búsqueda:</h2>
            <ul>
                {list.map((location: Location) => (
                    <li key={location.id} className="p-3 flex items-center">
                        <MdLocationPin className='text-xl mr-3' />
                        <NavLink
                            to={`/locations/${location.id}?lat=${location.latitude}&lon=${location.longitude}`}>
                            {location.name}, {location.country}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};
