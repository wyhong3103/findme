import '../styles/Game.css';
import { useParams } from 'react-router-dom';
import { GameNav } from '../components/GameNav';

export const Game = () => {
    
    const {id} = useParams();

    const bg = require(`../assets/${id}.jpg`);


    return(
        <div>
            <GameNav/>
            <div className="game-img-cont">
                <img src={bg} alt="game-img" onClick={(e) => {console.log(e)}}/>
            </div>
        </div>
    )
};