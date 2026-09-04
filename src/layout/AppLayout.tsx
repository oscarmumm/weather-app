import { Footer } from '../components/Footer';
import { Searchbar } from '../components/Searchbar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
    return (
        <div className="min-h-screen max-w-screen bg-cyan-700 flex flex-col items-center justify-between">
            <Searchbar />
            <div className='pt-24 w-full'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
