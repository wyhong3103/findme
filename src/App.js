import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LogIn } from './pages/LogIn';
import { Menu } from './pages/Menu';
import { Game } from './pages/Game';

export const App = () => {
    return(
        <div>
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
        </div>
    )
};