import '../styles/Game.css';
import { useParams } from 'react-router-dom';

export const Game = () => {
    
    const {id} = useParams();

    const bg = require(`../assets/${id}.jpg`);



    return(
        <div>
            <div className="game-img-cont">
                <img src={bg} alt="game-img" onClick={(e) => {console.log(e)}}/>
            </div>
        </div>
    )
};