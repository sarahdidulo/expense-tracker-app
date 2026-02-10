import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("");

    const logUserDetails = (id, name, token) => {
        setCurrentUser({
            id: id,
            name: name,
            token: token
        });
    }

    const clearLoggedUser = () => {
        setCurrentUser({
            id: '',
            name: '',
            token: ''
        })
    }

    const reLogUserDetails = (id, name, token) => {
        setCurrentUser({
            id: id,
            name: name,
            token: token
        })
    }
    
    return (
        <>
        {/* {alert('slnlknlank')} */}
            <CurrentUserContext.Provider value={{currentUser, logUserDetails, clearLoggedUser, reLogUserDetails}}>
                {children}
            </CurrentUserContext.Provider>
        </>
       
    );
}