import '../styles/Menu.css';
import { MenuNav } from '../components/MenuNav';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Navigate } from 'react-router-dom';
import {getFirestore, collection, getDocs} from 'firebase/firestore';


export const Menu = () => {

    const db = getFirestore();
    const firstTime = useContext(UserContext).firstTime;
    const navigate = useNavigate();
    const [levels, setLevels] = useState([]);

    const toGame = (id) => {
        navigate(`/game/${id}`);
    }

    useEffect(
        () => {
            (async () => {
                const temp = [];
                const levelsRef = collection(db, "game");
                const snapshot = await getDocs(levelsRef);
                snapshot.forEach(
                    doc => {
                        temp.push([doc.id, doc.data().levelName]);
                    }
                )
                setLevels(temp);
            })();
        }
    , [])

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
                                levels.map((item) => {
                                    return(
                                        <div className="menu-card" onClick={() => {toGame(item[0])}}>
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
