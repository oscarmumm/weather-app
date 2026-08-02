import { Footer } from '../components/Footer';
import { Searchbar } from '../components/Searchbar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-cyan-700 flex flex-col items-center justify-between">
            <Searchbar />
            <Outlet />
            <Footer />
        </div>
    );
};
