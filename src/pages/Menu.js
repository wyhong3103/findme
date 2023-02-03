import '../styles/Menu.css';
import { MenuNav } from '../components/MenuNav';
import {useContext} from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from 'react-router-dom';


export const Menu = () => {

    const firstTime = useContext(UserContext);

    const games = [
        [1, "Snow"],
        [2, "Space"],
        [3, "Beach"],
    ];

    return(
        <div>
            {
                firstTime ?
                
                <Navigate to="/login"/>

                :

                <div className='menu-cont'>
                    <MenuNav/>
                    <div className="menu-card-cont">
                        {
                                games.map((item) => {
                                    return(
                                        <div className="menu-card">
                                            <h3>{item[1]}</h3>
                                            <img src={require(`../assets/m${item[0]}.jpg`)} alt={item[1]} className="menu-card-img"/>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            }
        </div>
    )
};
