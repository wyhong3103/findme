import '../styles/Menu.css';

export const Menu = () => {

    const games = [
        [1, "Snow"],
        [2, "Space"],
        [3, "Beach"],
    ]

    return(
        <div className='menu-cont'>
           <div className="menu-card-cont">
               {
                    games.map((item) => {
                        return(
                            <div className="menu-card">
                                <h3>{item[1]}</h3>
                                <img src={require(`../assets/m${item[0]}.jpg`)} alt={item[1]} className="menu-card-img"/>
                            </div>
                        )
                    })
               }
           </div>
        </div>
    )
};
