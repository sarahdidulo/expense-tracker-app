import { useEffect, useState } from "react";
import "./Transactions.css";

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);

     useEffect(() => {
        // e.preventDefault();

        async function getTransactions (e) {
            try {
                const response = await fetch("http://localhost:4000/be-et/transactions/all");
                const data = await response.json();
                setTransactions(data);
                // mapData();
            } catch (err) {
                console.log(err);
            }
        }
            getTransactions();
        },[])

    return (
        <div className="transaction-list-container">
            <h2 className="transaction-list-heading">Transactions</h2>
            <ul className="transaction-list">
                { transactions.map((transaction, index) => {    
                    return (
                    <li class="transaction-list-item" key={index}>
                        <p className="transaction-name">Title:  {transaction.name}</p>
                        <p className="transaction-category">Category:  {transaction.category}</p>
                        <p className="transaction-date-of-transaction">Date of Transaction:  {transaction.dateOfTransaction}</p>
                        <p className="transaction-description">Description:  {transaction.description}</p>
                    </li> ) 
                })}           
            </ul>
        </div>
    );
}