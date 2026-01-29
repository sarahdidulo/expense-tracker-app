import {useId, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddExpense.css"

export default function AddExpense() {
    const id = useId();
    const [transaction, setTransaction] = useState({
        name: '',
        category: 'Grocery',
        dateOfTransaction: '',
        description: ''
    });

    async function addExpenseTransaction (e) {
        e.preventDefault();
        console.log(transaction)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        } 
        try {
            const response = await fetch("http://localhost:3000/be-et/transactions/add-expense", requestOptions);
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    function addExpenseModal () {
        var modal = document.getElementById("add-expense-wrapper");
        modal.classList.add("display");
    }

    return (
        // <h1>hello</h1>
        <>
            {/* got styles from dashboardtemplate for the button */}
            <div className="db-nav-add-transaction" >
                <button className="db-nav-add-transaction-button" onClick={addExpenseModal}>
                <img className="db-nav-plus-icon" src="./../src/assets/images/plus-icon.png" alt="Plus icon" />
                    Add a Transaction
                </button>
            </div>
            <div id="add-expense-wrapper" className="add-expense-wrapper">
                <form method="post" onSubmit={addExpenseTransaction}>
                    <label htmlFor={id + "-name"}>Name: </label>
                    <input type="text" 
                    id={id + "-name"}
                    name="transaction[name]" 
                    value={transaction.name}
                    onChange={e => setTransaction({...transaction, name: e.target.value})}/>
                    <br/>

                    <label htmlFor={id + "-category"}>Category: </label>
                    <select name={transaction.category} id={id + "-category"} onChange={e => setTransaction({...transaction, category: e.target.value})}>
                        <option value="Grocery">Grocery</option>
                        <option value="Loan Payment">Loan Payment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                    <br/>

                    <label htmlFor={id + "-dateOfTransaction"}>Date of Transaction: </label>
                    <DatePicker selected={transaction.dateOfTransaction} onChange={(date) => setTransaction({...transaction, dateOfTransaction: date})} dateFormat="MM/dd/yyyy" />
                    <br />
                    <label htmlFor={id + "-description"}>Description: </label>
                    <textarea 
                    id={id + "-description"}
                    name="transaction[description]" 
                    value={transaction.description}
                    onChange={e => setTransaction({...transaction, description: e.target.value})}/>
                    <br/>

                    <button type="submit" name="Add Expense">Add Expense</button>
                    <br/>
                </form> 
            </div>
        </>
        
    );
}