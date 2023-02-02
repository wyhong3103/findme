import '../styles/Menu.css';

export const Menu = () => {

    const games = [
        [1, "Snow"],
        [2, "Space"],
        [3, "Beach"],
    ]

    return(
        <div>
           {
                games.map((item) => {
                    return(
                        <div className="menu-card">
                            <img src={require(`../assets/${item[0]}.jpg`)} alt={item[1]}/>
                            <h3>{item[1]}</h3>
                        </div>
                    )
                })
           } 
        </div>
    )
};
