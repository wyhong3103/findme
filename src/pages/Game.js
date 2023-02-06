import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Leaderboard } from '../components/Leaderboard';

export const Game = () => {
    
    const storage = getStorage();
    const db = getFirestore();
    const userContext = useContext(UserContext);
    const [coord, setCoord] = useState([0,0]);
    const [dimension, setDimension] = useState([1,1]);
    const [hideDropdown, setHideDropDown] = useState(true);
    /*
    [
        [charName,x1, x2, y1, y2, photoURL, found]
    ]
    */
    const [gameObject, setGameObject] = useState([]);
    const [objectCount, setObjectCount] =useState(-1);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [timestamp, setTimestamp] = useState(0);
    const [bg, setBg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const dropdown = useRef();
    const game = useRef();


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
            setObjectCount(prev => prev-1);
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
        setTimestamp(Date.now());
        (async () => {
            const levelRef = doc(db, "game", id);
            const docSnap = await getDoc(levelRef);

            const gameObjectArr = [];
            for(const i of Object.keys(docSnap.data())){
                if (i === "levelName") continue;
                const temp = docSnap.data()[i];
                const url = await getDownloadURL(ref(storage, `${id}/${temp[0]}.png`));
                temp.push(url);
                temp.push(1);
                gameObjectArr.push(temp);
            }
            const bgUrl = await getDownloadURL(ref(storage, `${id}/${id}.jpg`));
            setBg(bgUrl);
            setObjectCount(gameObjectArr.length);
            setGameObject(gameObjectArr);
        })();
    }, [])

    useEffect(
        () => {
            if (objectCount === 0){
                //update leaderboard
                (async () => {
                    const leaderboardRef = collection(db, "leaderboard", "level", id);
                    
                    await addDoc(leaderboardRef, 
                        {
                            name : userContext.username,
                            time : Math.floor((Date.now() - timestamp) / 1000)
                        }    
                    )
                    setShowLeaderboard(true);
                })();
            }
        }
    , [objectCount])

    useEffect(
        () => {
            if (bg !== "" && objectCount !== -1){
                setIsLoading(false);
            }
        }
    ,[bg, objectCount])


    
    return(
        <div>
            {
                userContext.firstTime ?

                <Navigate to="/login"/>

                :

                (

                    isLoading ?

                    null

                    :

                    <div>
                        <div className="game-cont">
                            <div className="game-img-cont">
                                <GameNav objects={gameObject}/>
                                <img className="game-img" src={bg} alt="game-img" onClick={setCoordinate} ref={game}/>
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
                                                    <li onClick={() => verifyItem(index)} key={index}>
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
                )
            }
            {
                showLeaderboard ?  
                <Leaderboard id={id} hideLeaderboard={() => setShowLeaderboard(false)} />
                :
                null
            }
        </div>
    )
};