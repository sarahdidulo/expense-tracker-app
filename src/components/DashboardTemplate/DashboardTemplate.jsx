import "./DashboardTemplate.css";
import { NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import AddExpense from "../AddExpense/AddExpense";
import { CurrentUserContext } from "../CurrentUserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/images/expense-tracker-logo.png';
import plusIcon from '/src/assets/images/plus-icon.png';

export default function DashboardTemplate({children}) {
    const { currentUser, clearLoggedUser, reLogUserDetails } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    
    function checkCurrentUser () {
        if(currentUser.id !== ''&& sessionStorage.getItem('user_id')){
            reLogUserDetails(sessionStorage.getItem('user_id'), sessionStorage.getItem('name'), sessionStorage.getItem('token'));
            return true;
        } else {
            return false;
        }    
    }

    // console.log("Dashboard", currentUser);

    function logout () {   
        sessionStorage.clear(); 
        clearLoggedUser();
        navigate('/');
        
    }

     function addExpenseModal () {
        var modal = document.getElementById("add-expense-wrapper");
        modal.classList.toggle("display");
    }

    useEffect(()=> {
        checkCurrentUser();
    }, [])

    return (
        <>
        { currentUser.token ?
        <>
        <main className="db-wrapper">
            <div className="db-wrapper-inner">
                <AddExpense />
                <div className="db-nav-wrapper">
                    <div className="db-nav-wrapper-inner">
                        <a className="db-nav-db-link" href="/" >
                        <img className="db-nav-db-link-logo" src={logo} alt="Expense Tracker Logo"/>
                        <h1>Expense Tracker Dashboard</h1>
                    </a>                   
                    <a className="db-nav-profile-img-wrapper" href="/profile" >
                        {/* <img className="db-nav-profile-img" src={userDetails.image} alt="Profile Picture"/> */}
                        <p className="db-nav-profile-greeting">Hi {currentUser.name}!</p>
                    </a>
                    <nav className="db-sidenav-wrapper">
                        <NavLink to="/dashboard/overview">
                            Overview
                        </NavLink>
                        <NavLink to="/dashboard/transactions">
                            Transactions
                        </NavLink>
                        <NavLink to="/dashboard/profile">
                            Profile
                        </NavLink>
                    </nav>
                    <div className="db-nav-add-transaction" >
                        <button id="db-add-expense-button" className="db-nav-add-transaction-button" onClick={addExpenseModal}>
                        <img className="db-nav-plus-icon" src={plusIcon} alt="Plus icon" />
                            Add a Transaction
                        </button>
                    </div>
                    <button className="db-logout-button" onClick={logout}>Log Out</button>
                </div>
                </div>
                <div className="db-content">
                    {children}
                </div>
            </div>
        </main> 
        </>
          : <Navigate to="/" replace />
        } 
        </>     
    );
}