import '../styles/LogIn.css';

export const LogIn = () => {
    return(
        <div className='login-cont'>
            <h1 className="login-title">FindMe</h1>
            <button className="login-btn">
                Sign In With Google
            </button>
            <button className="login-btn">
                Continue as an Anonymous
            </button>
        </div>
    )
};