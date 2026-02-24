import { useEffect, useState, useContext } from "react";
import "./Transactions.css";
import { CurrentUserContext } from '../CurrentUserContext';


export default function Transactions() {

    const { currentUser, getTransactions, transactions } = useContext(CurrentUserContext);

    function convertTransactionDate (transaction_date) {
        const converted_transaction_date = new Date(transaction_date);
        let month = converted_transaction_date.getMonth() + 1;
        let day = converted_transaction_date.getDate();
        if(month.toString().length === 1) {
            month = `0` + month.toString();
        }
        if(day.toString().length === 1) {
            day = `0` + day.toString();
        }
        return `${month}` + `-${day}` + `-${converted_transaction_date.getFullYear()}` ;
    }

     useEffect(() => {
        getTransactions();
    },[])

    return (
        <div className="transaction-list-container">
            <h2 className="transaction-list-heading">Transactions</h2>
            <br />
            {transactions.length === 0 && <p>No transactions yet. Add one by clicking the Add transaction button!</p>}
            <ul className="transaction-list">
                { transactions.map((transaction, index) => {    
                    return (
                    <li className="transaction-list-item" key={index}>
                        <p className="transaction-list-item-text">Title: </p>
                        <p className="transaction-name">{transaction.name}</p>
                        <p className="transaction-list-item-text">Category: </p>
                        <p className="transaction-category">{transaction.category}</p>
                        <p className="transaction-list-item-text">Date of Transaction: </p>
                        <p className="transaction-date-of-transaction">{convertTransactionDate(transaction.dateOfTransaction)}</p>
                        <p className="transaction-list-item-text">Description: </p>
                        <p className="transaction-description">{transaction.description}</p>
                    </li> ) 
                })}           
            </ul>
        </div>
    );
}