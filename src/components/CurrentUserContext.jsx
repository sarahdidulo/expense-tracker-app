import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [ filteredTransactions, setFilteredTransactions] = useState([]);
    const [ newTransaction, setNewTransaction ] = useState('');

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

    async function filterTransactions(category) {
        try {
            clearFilteredTransactions();
            const response = await fetch(`http://localhost:4000/be-et/transactions/all/${currentUser.id}/${category}`);
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