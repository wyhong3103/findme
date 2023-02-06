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
                    objects.map((item, index) => {
                        return (
                            (item[6] ?
                                <li key={index}>
                                    <img src={item[5]} alt="obj-avatar" className='obj-avatar'/>
                                    {item[0]}
                                </li>    
                                :
                                <li className='object-found' key={index}>
                                    <img src={item[5]} alt="obj-avatar" className='obj-avatar'/>
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