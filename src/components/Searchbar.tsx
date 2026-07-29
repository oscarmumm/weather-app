import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

export const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className='p-3 w-full'>
            <form className="bg-white rounded-xl flex justify-between">
                <input
                    type="text"
                    placeholder='Ingrese el nombre de la ciudad'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='p-3 outline-none w-full'
                />
                <button className="p-3 text-xl">
                    <MdSearch />
                </button>
            </form>
        </div>
    );
};
