import '../styles/LogIn.css';
import { useNavigate } from 'react-router-dom';

export const LogIn = ({setFirstTime, setUsername, setPfp}) => {

    const navigate = useNavigate();

    const signInGoogle = () => {

    };

    const signInAnonymous = () => {
        setFirstTime(false);
        navigate("/");
    };

    return(
        <div className='login-cont'>
            <h1 className="login-title">FindMe</h1>
            <button className="login-btn">
                Sign In With Google
            </button>
            <button className="login-btn" onClick={signInAnonymous}>
                Continue as an Anonymous
            </button>
        </div>
    )
};