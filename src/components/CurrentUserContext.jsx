import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: null,
        token: null
    });

    const logUserDetails = (id, name, token) => {
        setCurrentUser({
            id: id,
            name: name,
            token: token
        })
    }

    const clearLoggedUser = () => {
        setCurrentUser({
            id: null,
            name: null,
            token: null
        })
    }
    
    return (
    <CurrentUserProvider value={{currentUser, logUserDetails, clearLoggedUser}}>
        {children}
    </CurrentUserProvider>
    );
}