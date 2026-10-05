import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CreateTicketPage from '../pages/CreateTicketPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import TicketsPage from '../pages/TicketsPage';
import TicketDetailPage from '../pages/TicketDetailPage';
import App from '../App';
import MainLayout from '../layouts/MainLayout';

export const AppRouter = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route
            path="/login"
            element={<LoginPage />}
            />

            <Route element={<MainLayout />}>
                <Route
                path="/"
                element={<App/>}
                />
                <Route
                path="/tickets/new"
                element={<CreateTicketPage />}
                />
                <Route
                path="/dashboard"
                element={<DashboardPage />}
                />
                <Route
                path="/tickets"
                element={<TicketsPage />}
                />
                <Route
                path="/tickets/:id"
                element={<TicketDetailPage />}
                />
                <Route
                path="*"
                element={<NotFoundPage />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
)
}

export default AppRouter;


