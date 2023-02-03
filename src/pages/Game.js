import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';
import {useContext} from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from 'react-router-dom';

export const Game = () => {
    
    const firstTime = useContext(UserContext).firstTime;
    const {id} = useParams();

    const bg = require(`../assets/${id}.jpg`);


    return(
        <div>
            {
                firstTime ?

                <Navigate to="/login"/>

                :

                <div>
                    <GameNav/>
                    <div className="game-img-cont">
                        <img src={bg} alt="game-img" onClick={(e) => {console.log(e)}}/>
                    </div>
                </div>
            }
        </div>
    )
};