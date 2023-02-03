import '../styles/MenuNav.css';
import {useContext} from 'react';
import { UserContext } from '../context/UserContext';

export const MenuNav = () => {
    const context = useContext(UserContext);

    return(
        <div className="menu-nav">
            <h1 className="menu-nav-title">FindMe</h1>
            <div className="menu-nav-user">
                <img src={context.pfp} alt="profile-img"/>
                <h3>{context.username}</h3>
            </div>
        </div>
    )
}
