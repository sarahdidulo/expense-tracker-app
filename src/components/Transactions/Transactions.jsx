import { useEffect, useState, useContext } from "react";
import "./Transactions.css";
import { CurrentUserContext } from '../CurrentUserContext';


export default function Transactions() {
    const [ monthFilter, setMonthFilter ] = useState('');
    const [ yearFilter, setYearFilter] = useState('');
    const { currentUser, getTransactions, transactions, filterTransactions, filteredTransactions, clearFilteredTransactions } = useContext(CurrentUserContext);
    const [ displayedTransactions, setDisplayedTransactions ] = useState([...transactions]);


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
        console.log("use effect");
        if(filteredTransactions != '') {
            console.log("detected filtered transations"); 
            setDisplayedTransactions(filteredTransactions);
            clearFilteredTransactions();
        } else {
            setDisplayedTransactions(transactions);
        }
    },[])

    // useEffect(()=> {
    //     console.log('use effect')
    //     setDisplayedTransactions(filteredTransactions)
    // }, [filteredTransactions])

    return (
        <div className="transaction-list-container">
            <h2 className="transaction-list-heading">Transactions</h2>
            {/* { filteredTransactions ? setDisplayedTransactions(filteredTransactions) : setDisplayedTransactions(transactions)} */}
            {console.log("filtered transactions", filteredTransactions)}
            {console.log("displayed transactions", displayedTransactions)}
            {displayedTransactions.length === 0 && <p>No transactions yet. Add one by clicking the Add transaction button!</p>}
            <p className="transaction-filter-text">Filter by month and year:</p>
            <select name={monthFilter} id="transaction-month-filter" onChange={e => setMonthFilter(e.target.value)}>
                <option value="-">---</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            {/* <br /> */}
            <select name={yearFilter} id="transaction-year-filter" onChange={e => setYearFilter(e.target.value)}>
                <option value="-">---</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
            </select>

            <button className="transaction-filter-button" onClick={() => filterTransactions(monthFilter, yearFilter)}>Filter</button>
            <ul className="transaction-list">
                { displayedTransactions.map((transaction, index) => {    
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