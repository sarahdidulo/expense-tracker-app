import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        token: ''
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
            id: '',
            name: '',
            token: ''
        })
    }
    
    return (
        <>
        {alert('slnlknlank')}
            <CurrentUserContext.Provider value={{currentUser, logUserDetails, clearLoggedUser}}>
                {children}
            </CurrentUserContext.Provider>
        </>
       
    );
}