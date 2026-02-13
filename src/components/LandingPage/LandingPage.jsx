import { useState, useContext } from 'react';
import { Navigate } from 'react-router';
import { CurrentUserContext } from '../CurrentUserContext';
import './LandingPage.css'
import LoginAndRegister from '../LoginAndRegister/LoginAndRegister';
import logo from '/src/assets/images/expense-tracker-logo.png';
import lpImage from './../src/assets/images/lp-image-expense.png';

export default function LandingPage(){

    const { currentUser } = useContext(CurrentUserContext);

    return (
        <main className="lp-wrapper-outer">
            <div className="lp-wrapper">
                {console.log('in landing page', currentUser)}
                {!currentUser.name && (
                <>
                <div className="lp-heading-wrapper">
                        <img className="lp-heading-logo" src={logo} alt="Expense Tracker Logo" />
                        <h1 className="lp-heading">Expense Tracker</h1>
                        <p className="lp-heading-desc">The Expense Tracker App is a comprehensive, user-friendly mobile application designed to simplify personal financial management by replacing manual, error-prone, or paper-based methods with digital, automated tracking. </p>
                        <LoginAndRegister />
                    </div>
                    <div className="lp-image-wrapper">
                        <img className="lp-image" src={lpImage} alt="Expense Tracker Landing Page image" />
                    </div>
                </>
                    )}
                { currentUser.name && (<Navigate to="/dashboard/overview" replace /> )}
            </div>
        </main>
    );
}