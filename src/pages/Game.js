import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const Game = () => {
    
    const storage = getStorage();
    const db = getFirestore();
    const firstTime = useContext(UserContext).firstTime;
    const [coord, setCoord] = useState([0,0]);
    const [dimension, setDimension] = useState([1,1]);
    const [hideDropdown, setHideDropDown] = useState(true);
    /*
    [
        [charName,x1, x2, y1, y2, photoURL, found]
    ]
    */
    const [gameObject, setGameObject] = useState([]);
    const {id} = useParams();
    const dropdown = useRef();
    const game = useRef();
    const bg = require(`../assets/${id}.jpg`);

    const setCoordinate = (e) => {
        setHideDropDown(prev => !prev);
        setCoord(
            [
                Math.floor(e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth * 100),
                Math.floor(e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight * 100)
            ]
        );
    }

    const verifyItem = (index) => {
        if (gameObject[index][6] === 1 && coord[0] >= gameObject[index][1] && coord[0] <= gameObject[index][2] && coord[1] >= gameObject[index][3] && coord[1] <= gameObject[index][4])
        {
            const temp = [...gameObject];
            temp[index][6] = 0;
            setGameObject(temp);
            setHideDropDown(prev => !prev);
        }
    }

    useEffect(() => {
        if (!game.current) return; 

        const resizeObserver = new ResizeObserver(() => {
            setDimension([game.current.offsetWidth, game.current.offsetHeight]);
        });
        resizeObserver.observe(game.current);
        return () => resizeObserver.disconnect(); // clean up 
    }, []);

    useEffect(() => {
        (async () => {
            const levelRef = doc(db, "game", id);
            const docSnap = await getDoc(levelRef);

            const gameObjectArr = [];
            for(const i of Object.keys(docSnap.data())){
                if (i == "levelName") continue;
                const temp = docSnap.data()[i];
                const url = await getDownloadURL(ref(storage, `${id}/${temp[0]}.png`));
                temp.push(url);
                temp.push(1);
                gameObjectArr.push(temp);
            }
            setGameObject(gameObjectArr);
        })();
    }, [])


    
    return(
        <div>
            {
                firstTime ?

                <Navigate to="/login"/>

                :

                <div>
                    <GameNav objects={gameObject}/>
                    <div className="game-cont">
                        <div className="game-img-cont">
                            <img src={bg} alt="game-img" onClick={setCoordinate} ref={game}/>
                            <div
                                className={`dropdown ${(hideDropdown ? "hide" : "show")}`}
                                style= {
                                    {
                                        top : `${(coord[1]/100)*(dimension[1])}px`,
                                        left : `${(coord[0]/100)*(dimension[0])}px`
                                    }
                                }
                                ref={dropdown}>
                                <ul>
                                    {
                                        gameObject.map((item, index) => {
                                            return(
                                                item[6] ?
                                                <li onClick={() => verifyItem(index)}>
                                                    {item[0]}
                                                </li>
                                                :
                                                null
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                    </div>
                    </div>
                </div>
            }
        </div>
    )
};