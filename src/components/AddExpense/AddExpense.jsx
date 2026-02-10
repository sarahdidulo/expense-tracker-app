import {useId, useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddExpense.css";
import { CurrentUserContext } from "../CurrentUserContext";
// import Uploady from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-button";

export default function AddExpense() {
    const { currentUser, reLogUserDetails } = useContext(CurrentUserContext);
    const id = useId();
    const [transaction, setTransaction] = useState({
        name: '',
        category: 'Grocery',
        dateOfTransaction: '',
        description: '',
        transactor_id: currentUser.id
    });

    function checkCurrentUser () {
        if(currentUser.id !== ''&& sessionStorage.getItem('user_id')){
            reLogUserDetails(sessionStorage.getItem('user_id'), sessionStorage.getItem('name'), sessionStorage.getItem('token'));
            return true;
        } else {
            return false;
        }    
    }

    function removeModalDisplay () {
        var modal = document.getElementById("add-expense-wrapper");
        modal.classList.remove("display");
    }
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
            const response = await fetch("http://localhost:4000/be-et/transactions/add-expense", requestOptions);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

   
    useEffect(()=> {
        checkCurrentUser();
    }, [])

    return (
        // <h1>hello</h1>
        <>
            {console.log('in add expense', currentUser.id)} 

            <div id="add-expense-wrapper" className="add-expense-wrapper">
                <div className="close-button" onClick={removeModalDisplay}>
                    <img src="/../src/assets/images/close-button.png" alt=""/>
                </div>
                <form className="add-expense-form" method="post" onSubmit={addExpenseTransaction}>
                    <h3 className="add-expense-form-heading">Add a New Transaction</h3>
                    <label htmlFor={id + "-name"}>Name: </label>
                    <input type="text" 
                    id={id + "-name"}
                    name="transaction[name]" 
                    value={transaction.name}
                    placeholder="Enter a transaction name"
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
                    placeholder="Enter a description"
                    onChange={e => setTransaction({...transaction, description: e.target.value})}/>
                    <br/>
                    {/* <Uploady
                        destination={{ url: "http://localhost:4000/be-et/transactions/add-expense" }}>
                        <UploadButton/>
                    </Uploady> */}
                    <button type="submit" className="add-expense-submit-button" name="Add Expense">Add Expense</button>
                    <br/>
                </form> 
            </div>
        </>
        
    );
}