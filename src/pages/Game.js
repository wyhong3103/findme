import '../styles/Game.css';
import { useParams } from 'react-router-dom';

export const Game = () => {
    
    const {id} = useParams();

    const bg = require(`../assets/${id}.jpg`);

    return(
        <div>
            <img src={bg} alt="game-img"/>
        </div>
    )
};