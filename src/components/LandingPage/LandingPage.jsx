import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from 'react-router';
import LoadingComponent from '../LoadingComponent';

import './LandingPage.css'

export default function LandingPage(){
    const { isLoading, error, isAuthenticated } = useAuth0();
    return (
        <main className="lp-wrapper">
        <LoadingComponent />
        {!error && !isLoading && (
        <>
           <div className="lp-heading-wrapper">
                <img className="lp-heading-logo" src="./../src/assets/images/expense-tracker-logo.png" alt="Expense Tracker Logo" />
                <h1 className="lp-heading">Expense Tracker</h1>
                <p className="lp-heading-desc">The Expense Tracker App is a comprehensive, user-friendly mobile application designed to simplify personal financial management by replacing manual, error-prone, or paper-based methods with digital, automated tracking. </p>
                <LoginButton />
            </div>
            <div className="lp-image-wrapper">
                <img className="lp-image" src="./../src/assets/images/lp-image-expense.png" alt="Expense Tracker Landing Page image" />
            </div>
        </>
            )}
        { isAuthenticated && (<Navigate to="/dashboard/overview" replace /> )}
        </main>
    );
}