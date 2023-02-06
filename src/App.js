import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import './styles/App.css';
import { LogIn } from './pages/LogIn';
import { Menu } from './pages/Menu';
import { Game } from './pages/Game';
import { UserContext } from './context/UserContext';

export const App = () => {

    const [firstTime, setFirstTime] = useState(true);
    const [username, setUsername] = useState("Anonymous");
    const [pfp, setPfp] = useState(require('./assets/anonymous.jpg'));

    return(
        <UserContext.Provider value={
            {
                firstTime, username, pfp
            }
        }>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Menu/>}
                    />
                    <Route
                        path="/*"
                        element={<Menu/>}
                    />
                    <Route
                        path="/login"
                        element=
                        {
                            <LogIn 
                                setFirstTime={setFirstTime} 
                                setUsername={setUsername} 
                                setPfp={setPfp}
                            />
                        }
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
        </UserContext.Provider>
    )
};