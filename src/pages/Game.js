import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';


const gameData = {
    1 : [
        ["Waldo", 1,83, 87, 78, 87],
        ["Wizard", 1, 5, 8, 82, 87],
        ["Odlaw", 1, 30, 32,69, 74],
        ["Wenda", 1, 48, 50, 44, 50],
    ],
    2 : [
        ["Waldo", 1, 39, 41, 54, 59],
        ["Wizard", 1, 77, 79, 48, 53],
        ["Odlaw", 1, 6, 7, 62, 65],
        ["Wenda", 1, 28, 29, 42, 47],
    ],
    3 : [
        ["Waldo", 1, 60, 63, 36, 44],
        ["Wizard", 1, 26, 28, 35, 40],
        ["Odlaw", 1, 10, 11, 35, 42],
        ["Wenda", 1, 76, 78, 41, 45],
    ]
}

export const Game = () => {
    
    const firstTime = useContext(UserContext).firstTime;
    const [coord, setCoord] = useState([0,0]);
    const [dimension, setDimension] = useState([1,1]);
    const [hideDropdown, setHideDropDown] = useState(true);
    const {id} = useParams();
    const dropdown = useRef();
    const game = useRef();

    const bg = require(`../assets/${id}.jpg`);

    const [objects, setObjects] = useState(
        gameData[id].map((item) => {
            return [...item];
        })
    );

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
        if (objects[index][1] === 1 && coord[0] >= objects[index][2] && coord[0] <= objects[index][3] && coord[1] >= objects[index][4] && coord[1] <= objects[index][5])
        {
            const temp = [...objects];
            temp[index][1] = 0;
            setObjects(temp);
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


    
    return(
        <div>
            {
                firstTime ?

                <Navigate to="/login"/>

                :

                <div>
                    <GameNav objects={objects}/>
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
                                        objects.map((item, index) => {
                                            return(
                                                item[1] ?
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