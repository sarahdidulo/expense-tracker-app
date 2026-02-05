import "./DashboardTemplate.css";
import { NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import AddExpense from "../AddExpense/AddExpense";
import { CurrentUserContext } from "../CurrentUserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function DashboardTemplate({children}) {
    const [ userDetails, setUserDetails ] = useState({});
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    
    // console.log("Dashboard", currentUser);
    function addExpenseModal () {
        return null;
    }

    function logout () {   
        sessionStorage.clear(); 
        navigate('/');
        
    }

    // EDIT USE EFFECT WITH DETAILS FROM CURRENT USER
    useEffect(() => {
        setUserDetails({
            name: currentUser.name
            // fullname: user.name,
            // image: user.picture
        })
    },[])

    return (
        <>
        { currentUser.token ?
        <>
        <main className="db-wrapper">
            <div className="db-wrapper-inner">
                <div className="db-nav-wrapper">
                    <div className="db-nav-wrapper-inner">
                        <a className="db-nav-db-link" href="/" >
                        <img className="db-nav-db-link-logo" src="./../src/assets/images/expense-tracker-logo.png" alt="Expense Tracker Logo"/>
                        <h1>Expense Tracker Dashboard</h1>
                    </a>                   
                    <a className="db-nav-profile-img-wrapper" href="/profile" >
                        {/* <img className="db-nav-profile-img" src={userDetails.image} alt="Profile Picture"/> */}
                        <p className="db-nav-profile-greeting">Hi {userDetails.name}!</p>
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
                    <AddExpense />
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