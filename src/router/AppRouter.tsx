import { Route, Routes, BrowserRouter } from 'react-router';
import { Home } from '../pages/Home';
import { AppLayout } from '../layout/AppLayout';
import { Weather } from '../pages/Weather';
import { LocationsList } from '../pages/LocationsList';
import { Favorites } from '../pages/Favorites';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/locations/:locationId'
                        element={<Weather />}
                    />
                    <Route path='/locations-list' element={<LocationsList />} />
                    <Route path='/favorites' element={<Favorites />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
