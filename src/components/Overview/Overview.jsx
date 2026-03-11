import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Overview.css';

export default function Overview() {

    ChartJS.register(ArcElement, Tooltip, Legend);
    const { getTransactions, filterTransactions, clearFilteredTransactions, transactions, newTransaction, clearNewTransaction} = useContext(CurrentUserContext);
    const [ categories, setCategories ] = useState(['Groceries', 'Loan Payment', 'Utilities', 'Maintenance']);
    const [ currentTransactions, setCurrentTransactions ] = useState('');
    const [data, setData] = useState({
        labels: categories,
        datasets: [
            {
            label: 'Expenses by Category',
            data: '',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
        });

    const [ pie, setPie ] = useState(<Pie data={data} />);

    async function getData(setdata) {
        console.log("get data", setdata)
        let temp = [];
        let totalAmount;
        categories.map((category, index) => {
            totalAmount = 0;
            if(setdata) {
                setdata.map((transaction, index) => {
                if(transaction.category === category) {
                    totalAmount += transaction.amount
                } 
                })
                console.log(`category: ${category}, total amount: ${totalAmount}`);
                temp = [...temp, totalAmount];
            }
        });
        console.log(temp)

        setData({
        labels: categories,
        datasets: [
            {
            label: 'Expenses by Category',
            data: temp,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
        })
    }

    async function settingData (setdata) {
        // console.log("setting data", setdata)
    }

    useEffect(() => {
         if (newTransaction == true) {
            console.log("new transaction")
             async function newTransactionDetected () {
                await getTransactions();
                setCurrentTransactions(transactions);
                await clearNewTransaction();
                await getData(currentTransactions);
            }
            newTransactionDetected();
        } else if(currentTransactions == '' ) {
            console.log("blank")
            setCurrentTransactions(transactions)
        } else if (currentTransactions != ''){
            console.log("set")
        }
        console.log(currentTransactions)
        getData(currentTransactions);
    }, [( newTransaction == true || transactions != '' && currentTransactions == '')]);

    return (
        <>
            <div className="overview-wrapper">
                <h1>Overview Content</h1>
                <div className="overview-chart">
                     <Pie data={data}/>
                </div>
            </div>
            
        </>
 
    );
}

