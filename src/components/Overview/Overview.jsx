import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Overview.css';

export default function Overview() {

    ChartJS.register(ArcElement, Tooltip, Legend);
    const { filterTransactions } = useContext(CurrentUserContext);
    const [ categories, setCategories ] = useState(['Groceries', 'Loan Payment', 'Utilities', 'Maintenance']);
    
    async function getData() {
        let data = [];
        categories.map(async (category, index) => {
            let totalAmount = 0;
            const data = await filterTransactions(category);
            data.map((transaction, index) => {
                totalAmount += transaction.amount;
            })
            console.log(`category : ${category} : total amount: ${totalAmount}`, )
            data = [...data, totalAmount];
        })
        return data;
    }

    const data = {
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
    };

    useEffect(() => {
        data.data = getData();
    })

    return (
        <>
            <div className="overview-wrapper">
                <h1>Overview Content</h1>
                <div className="overview-chart">
                     <Pie data={data} />
                </div>
            </div>
            
        </>
 
    );
}

