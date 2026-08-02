import { Route, Routes, BrowserRouter } from 'react-router';
import { Home } from '../pages/Home';
import { AppLayout } from '../layout/AppLayout';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
