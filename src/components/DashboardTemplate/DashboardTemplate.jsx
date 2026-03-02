import "./DashboardTemplate.css";
import { NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import AddExpense from "../AddExpense/AddExpense";
import { CurrentUserContext } from "../CurrentUserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import profileIconBlue from '/src/assets/images/profile-icon-blue.png';
import profileIconWhite from '/src/assets/images/profile-icon-white.png';
import transactionsIconBlue from '/src/assets/images/receipt-blue.png';
import transactionsIconWhite from '/src/assets/images/receipt-white.png';
import overviewIconBlue from '/src/assets/images/pie-chart-blue.png';
import overviewIconWhite from '/src/assets/images/pie-chart-white.png';
import logo from '/src/assets/images/expense-tracker-logo.png';
import plusIcon from '/src/assets/images/plus-icon.png';
import SuccessBanner from "../Banner/SuccessBanner";
import InvalidBanner from "../Banner/InvalidBanner";
import { BannerContext } from "../Banner/BannerContext";

export default function DashboardTemplate({children}) {
    const { currentUser, clearLoggedUser, reLogUserDetails } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const { successMessage, showSuccessMessage, clearSuccessMessage} = useContext(BannerContext);
    
    function checkCurrentUser () {
        if(currentUser.id !== ''&& sessionStorage.getItem('user_id')){
            reLogUserDetails(sessionStorage.getItem('user_id'), sessionStorage.getItem('name'), sessionStorage.getItem('token'));
            return true;
        } else {
            return false;
        }    
    }

    function logout () {   
        sessionStorage.clear(); 
        clearLoggedUser();
        navigate('/');
        
    }

     function addExpenseModal () {
        var modal = document.getElementById("add-expense-outer");
        modal.classList.toggle("display");
    }

    // function NavImage ({navlink, active}) {
    //     let source;
    //     if(navlink === 'overview') {
    //         source = {overviewIconBlack};
    //     } else if(navlink === 'transactions'){
    //         source = {transactionsIconBlack};
    //     } else if(navlink === 'profile') {
    //         source = {profileIconBlack}
    //     }
    //     return <img src={source} alt={navlink}/>
    // }

    useEffect(()=>{
        setActiveTab(()=>{
            let path = window.location.pathname;
            if(path.includes('overview')) {
                return 'overview';
            } else if(path.includes('transactions')) {
                return 'transactions';
            } else if(path.includes('profile')) {
                return 'profile';
            }
        });
    }, [window.location.pathname])
    
    // const checkSuccessMessage = () => {
    //     if(successMessage === true) {
    //         clearSuccessMessage();
    //         return <SuccessBanner />
    //     } else if(successMessage === false) {
    //         clearSuccessMessage();
    //         return <InvalidBanner />
    //     }
    // }

    return (
        <>
        { currentUser.token ?
        <>
        <main className="db-wrapper">
            <AddExpense />
            <SuccessBanner />
            <InvalidBanner />
            <div className="db-wrapper-inner">
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
                        <NavLink to="/dashboard/overview" id="overview" className="db-nav-link">
                            <img src={activeTab === 'overview' ? overviewIconWhite : overviewIconBlue} alt />
                            Overview
                        </NavLink>
                        <NavLink to="/dashboard/transactions" id="transactions" className="db-nav-link">
                            <img src={activeTab === 'transactions' ? transactionsIconWhite : transactionsIconBlue} alt />
                            Transactions
                        </NavLink>
                        <NavLink to="/dashboard/profile" id="profile" className="db-nav-link">
                            <img src={activeTab === 'profile' ? profileIconWhite: profileIconBlue} alt />
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