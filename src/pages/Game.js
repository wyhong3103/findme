import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export const Game = () => {
    
    const firstTime = useContext(UserContext).firstTime;
    const [coord, setCoord] = useState([0,0]);
    const [dimension, setDimension] = useState([1,1]);
    const [hideDropdown, setHideDropDown] = useState(true);
    const {id} = useParams();
    const dropdown = useRef();
    const game = useRef();

    const bg = require(`../assets/${id}.jpg`);

    const objects = [
        ["Waldo", 1],
        ["Wizard", 1]
    ];

    const setCoordinate = (e) => {
        setHideDropDown(prev => !prev);
        setCoord(
            [
                Math.floor(e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth * 100),
                Math.floor(e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight * 100)
            ]
        );
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
                    <div class="game-cont">
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