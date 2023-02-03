import '../styles/GameNav.css';
import { useNavigate } from 'react-router-dom';

export const GameNav = () => {
    
    const navigate = useNavigate();

    // Show Objects that are yet to be found    

    const objects = [
        ["Waldo", 1],
        ["Wizard",0]
    ]

    const toMenu = () => {
        navigate('/');
    }

    return(
        <div className="game-nav">
            <ul className="game-objects">
                {
                    objects.map((item) => {
                        return (
                            (item[1] ?
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