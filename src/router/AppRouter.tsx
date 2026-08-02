import { Route, Routes, BrowserRouter } from 'react-router';
import { Home } from '../pages/Home';
import { AppLayout } from '../layout/AppLayout';
import { Locations } from '../pages/Locations';
import { LocationsList } from '../pages/LocationsList';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/locations/:locationId'
                        element={<Locations />}
                    />
                    <Route path='/locations-list' element={<LocationsList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
