import '../styles/Menu.css';
import { MenuNav } from '../components/MenuNav';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Navigate } from 'react-router-dom';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const Menu = () => {

    const storage = getStorage();
    const db = getFirestore();
    const firstTime = useContext(UserContext).firstTime;
    const navigate = useNavigate();
    const [level, setLevel] = useState([]);

    const toGame = (id) => {
        navigate(`/game/${id}`);
    }

    useEffect(
        () => {
            (async () => {
                const temp = [];
                const levelRef = collection(db, "game");
                const snapshot = await getDocs(levelRef);
                snapshot.forEach(
                    doc => {
                        temp.push([doc.id, doc.data().levelName]);
                    }
                )
                const levelArr = [];
                for(const doc of temp){
                    const url = await getDownloadURL(ref(storage, `${doc[0]}/m${doc[0]}.jpg`));
                    levelArr.push([...doc, url]);
                }
                setLevel(levelArr);
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
                                level.map((item) => {
                                    return(
                                        <div className="menu-card" onClick={() => {toGame(item[0])}}>
                                            <h3>{item[1]}</h3>
                                            <img src={item[2]} alt={item[1]} className="menu-card-img"/>
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
