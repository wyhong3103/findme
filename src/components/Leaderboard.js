import '../styles/Leaderboard.css';
import { useState, useEffect} from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

export const Leaderboard = ({id, hideLeaderboard}) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const db = getFirestore();

    useEffect(
        () => {
            (async () => {
                const leaderboardRef = collection(db, "leaderboard", "level", id);
                const q = query(leaderboardRef, orderBy("time"));
                const leaderboardSnap = await getDocs(q);
                
                const temp = [];
                leaderboardSnap.forEach(
                    doc => {
                        temp.push(doc.data());
                    }
                )
                setLeaderboard(temp);
            })();
        }
    ,[])

    return(
        <div>
            <div className='blur-bg'/>
            <div className="leaderboard-flex-cont">
                    <div className="leaderboard-cont">
                        <h3 className='leaderboard-title'>Leaderboard</h3>
                        <div className="col">
                            <h5>Name</h5>
                            <h5>Time Taken</h5>
                        </div>
                        <ul>
                            {
                                leaderboard.map(
                                    (item) => {
                                        return(
                                            <li>
                                                <div className='leaderboard-name'>
                                                    {item.name}
                                                </div>
                                                <div className='leaderboard-time'>
                                                    {Math.floor(item.time / 60)}m {item.time % 60}s
                                                </div>
                                            </li>
                                        )
                                    }
                                )
                            }
                        </ul>
                        <button className='hide-leaderboard-btn' onClick={hideLeaderboard}>
                            OK
                        </button>
                    </div>
            </div>
        </div>
    )
}