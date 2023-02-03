import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';
import { useRef, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export const Game = () => {
    
    const firstTime = useContext(UserContext).firstTime;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [hideDropdown, setHideDropDown] = useState(true);
    const {id} = useParams();
    const dropdown = useRef();
    const game = useRef();

    const bg = require(`../assets/${id}.jpg`);

    const objects = [
        ["Waldo", 1],
        ["Wizard", 1]
    ];

    const setDropdown = (x, y) => {
        setHideDropDown(prev => !prev);
    }

    const setCoordinate = (e) => {
        setDropdown();
        setX(Math.floor(e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth * 100));
        setY(Math.floor(e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight * 100));
    }

    return(
        <div>
            {
                firstTime ?

                <Navigate to="/login"/>

                :

                <div>
                    <GameNav objects={objects}/>
                    <div class="game-cont">
                        <div className="game-img-cont">
                            <img src={bg} alt="game-img" onClick={setCoordinate} ref={game}/>
                            <div
                                className={`dropdown ${(hideDropdown ? "hide" : "show")}`}
                                style= {
                                    {
                                        top : `${(y/100)*(game.current ? game.current.offsetHeight : 1)}px`,
                                        left : `${(x/100)*(game.current ? game.current.offsetWidth : 1)}px`
                                    }
                                }
                                ref={dropdown}>
                                <ul>
                                    {
                                        objects.map((item) => {
                                            return(
                                                item[1] ?
                                                <li>
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