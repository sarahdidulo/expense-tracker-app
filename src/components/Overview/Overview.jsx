import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TransactionChart from "../TransactionChart/TransactionChart.jsx"
import { CurrentUserContext } from "../CurrentUserContext";

export default function Overview() {

    return (
        <>
            <h1>Overview Content</h1>
            <TransactionChart/>
        </>
 
    );
}