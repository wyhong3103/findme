import '../styles/GameNav.css';

export const GameNav = () => {
    // Show Objects that are yet to be found

    const objects = [
        ["Waldo", 1],
        ["Wizard",0]
    ]

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
        </div>
    )
}