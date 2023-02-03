import {createContext} from 'react';

export const UserContext = createContext(
    {
        first : true,
        username : "Anonymous",
        pfp : require('../assets/anonymous.jpg')
    }
)
