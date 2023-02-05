import { useState, useEffect} from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

export const Leaderboard = ({id}) => {
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
    )

    return(
        <div>
            <div className='blur-bg'/>
            <ul className='leaderboard-cont'>
                {
                    leaderboard.map(
                        (item) => {
                            return(
                                <li>
                                    <div className='leaderboard-name'>
                                        {item.name}
                                    </div>
                                    <div className='leaderboard-time'>
                                        {item.time}
                                    </div>
                                </li>
                            )
                        }
                    )            
                }
            </ul>
        </div>
    )
}