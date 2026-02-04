import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("");

    const logUserDetails = (id, name, token) => {
        // console.log(name)
        setCurrentUser({
            id: id,
            name: name,
            token: token
        });
        // console.log("current user", currentUser);
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
        {/* {alert('slnlknlank')} */}
            <CurrentUserContext.Provider value={{currentUser, logUserDetails, clearLoggedUser}}>
                {children}
            </CurrentUserContext.Provider>
        </>
       
    );
}