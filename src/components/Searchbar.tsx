import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { fetchLocations } from '../services/geocodingService';
import type { Location } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, useNavigate } from 'react-router';

const resultsListAnimation = {
    open: {
        opacity: 1,
        y: 0,
    },
    closed: {
        opacity: 0,
        y: -20,
    },
};

export const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState([]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    let navigate = useNavigate();

    async function searchLocations(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = await fetchLocations({ name: searchTerm });
        setSearchResults(data.results);
        navigate('locations-list', { state: data.results });
        setSearchResults([]);
    }

    useEffect(() => {
        if (searchTerm.trim().length <= 3) {
            setSearchResults([]);
            setShowErrorMessage(false);
            return;
        }
        let isCancelled = false;
        const timer = setTimeout(async () => {
            try {
                const data = await fetchLocations({ name: searchTerm });
                if (!isCancelled) {
                    const locations = data?.results ?? [];
                    setSearchResults(locations);
                    setShowErrorMessage(locations.length === 0);
                    console.log(locations);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Error al buscar localizaciones: ', error);
                    setSearchResults([]);
                }
            }
        }, 300);
        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [searchTerm]);

    return (
        <div className='p-3 w-full z-10 fixed'>
            <form
                className='bg-white rounded-xl flex justify-between'
                onSubmit={searchLocations}
            >
                <input
                    type='text'
                    placeholder='Ingrese el nombre de la ciudad'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='p-3 outline-none w-full'
                />
                <button className='p-3 text-xl'>
                    <MdSearch />
                </button>
            </form>
            <ul className='bg-white rounded-xl mt-3'>
                <AnimatePresence>
                    {searchResults.map((location: Location) => (
                        <motion.li
                            variants={resultsListAnimation}
                            initial='closed'
                            transition={{ type: 'tween' }}
                            animate='open'
                            key={location.id}
                            className='p-3'
                        >
                            <NavLink
                                to={`/locations/${location.id}?lat=${location.latitude}&lon=${location.longitude}`}
                                onClick={() => {
                                    setSearchResults([]);
                                    setSearchTerm('');
                                }}
                            >
                                {location.name}, {location.country}
                            </NavLink>
                        </motion.li>
                    ))}
                    {showErrorMessage && (
                        <li className='p-3'>
                            No se encontraron resultados para la búsqueda
                        </li>
                    )}
                </AnimatePresence>
            </ul>
        </div>
    );
};
