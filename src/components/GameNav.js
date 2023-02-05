import '../styles/GameNav.css';
import { useNavigate } from 'react-router-dom';

export const GameNav = ({objects}) => {
    
    const navigate = useNavigate();

    const toMenu = () => {
        navigate('/');
    }

    return(
        <div className="game-nav">
            <ul className="game-objects">
                {
                    objects.map((item) => {
                        return (
                            (item[6] ?
                                <li>
                                    {item[0]}
                                </li>    
                                :
                                <li className='object-found'>
                                    {item[0]}
                                </li>    
                            )
                        )
                    })
                }
            </ul>
            <h3 className='exit-btn' onClick={toMenu}>
                Exit
            </h3>
        </div>
    )
}