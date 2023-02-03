import {createContext} from 'react';

export const UserContext = createContext(
    {
        first : true,
        username : "",
        pfp : ""
    }
)
