import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { LogIn } from './pages/LogIn';
import { Menu } from './pages/Menu';
import { Game } from './pages/Game';

export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<LogIn/>}
                />
                <Route
                    path="/login"
                    element={<LogIn/>}
                />
                <Route
                    path="/menu"
                    element={<Menu/>}
                />
                <Route
                    path="/game/:id"
                    element={<Game/>}
                />
            </Routes>    
        </BrowserRouter>
    )
};