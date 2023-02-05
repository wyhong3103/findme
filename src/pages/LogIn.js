import '../styles/LogIn.css';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogIn = ({setFirstTime, setUsername, setPfp}) => {

    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInGoogle = () => {
        signInWithRedirect(auth, provider);
    };

    const signInAnonymous = () => {
        setFirstTime(false);
        navigate("/");
    };

    useEffect(
        () => { 
            getRedirectResult(auth)
            .then(
                (result) => {
                    if (result.user){
                        setFirstTime(false);
                        setUsername(result.user.displayName);
                        setPfp(result.user.photoURL);
                        navigate("/");
                    }
                }
            )
            .catch(
                (error) => {
                    console.error(error);
                }
            )
        }
    , [])

    return(
        <div className='login-cont'>
            <h1 className="login-title">FindMe</h1>
            <button className="login-btn" onClick={signInGoogle}>
                Sign In With Google
            </button>
            <button className="login-btn" onClick={signInAnonymous}>
                Continue as an Anonymous
            </button>
        </div>
    )
};