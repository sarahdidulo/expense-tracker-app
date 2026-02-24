import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("");
    const [transactions, setTransactions] = useState([]);

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
    
    async function getTransactions () {
        try {
            const response = await fetch(`http://localhost:4000/be-et/transactions/all/${currentUser.id}`);
            const data = await response.json();
            setTransactions(data);
            return transactions;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <CurrentUserContext.Provider value={{currentUser, logUserDetails, clearLoggedUser, reLogUserDetails, getTransactions, transactions}}>
                {children}
            </CurrentUserContext.Provider>
        </>
       
    );
}