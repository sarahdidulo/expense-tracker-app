import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const prod_url = import.meta.env.VITE_PROD_URL;
    const [currentUser, setCurrentUser] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [ filteredTransactions, setFilteredTransactions] = useState([]);
    const [ newTransaction, setNewTransaction ] = useState('');

    async function logUserDetails (id, username, email, token) {
        setCurrentUser({
            id: id,
            username: username,
            email: email,
            token: token,
        });
    }

    const clearLoggedUser = () => {
        setCurrentUser({
            id: '',
            email: '',
            username: '',
            token: '',
        })
    }

    async function reLogUserDetails (id) {
        const response = await fetch(`${prod_url}/be-et/user/user-details/${id}`);
        const data = await response.json();
        setCurrentUser({
            ...currentUser,
            username: data.username,
            email: data.email,
        })
    }
    
    async function getTransactions () {
        try {
            const response = await fetch(`${prod_url}/be-et/transactions/all/${currentUser.id}`);
            const data = await response.json();
            setTransactions(data);
            return transactions;
        } catch (err) {
            console.log(err);
        }
    }

    async function filterTransactions(category) {
        try {
            clearFilteredTransactions();
            const response = await fetch(`${prod_url}/be-et/transactions/all/${currentUser.id}/${category}`);
            const data = await response.json();
            console.log('returned data', data)
            setFilteredTransactions(data);
        } catch(err) {
            console.log("this is the error", err);
        }
        
    }

    function clearFilteredTransactions() {
        setFilteredTransactions('');
    }

    function logNewTransaction() {
        setNewTransaction(true);
    }

    function clearNewTransaction(){
        setNewTransaction('');
    }

    return (
        <>
            <CurrentUserContext.Provider value={{currentUser, logUserDetails, clearLoggedUser, reLogUserDetails, getTransactions, transactions, filterTransactions, filteredTransactions, clearFilteredTransactions, newTransaction, logNewTransaction, clearNewTransaction}}>
                {children}
            </CurrentUserContext.Provider>
        </>
       
    );
}