import LandingPage from "./components/LandingPage/LandingPage";
import Overview from "./components/Overview/Overview";
import Transactions from "./components/Transactions/Transactions";
import Profile from "./components/Profile/Profile";
import "./assets/styles/main.css";
import DashboardTemplate from "./components/DashboardTemplate/DashboardTemplate";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRedirect from "./components/LoginRedirect";
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";

function App() {

  return ( 
        <>
        <Router>
           <Routes>
            <Route index element={
                <LandingPage /> }/>
            <Route path="dashboard/overview" element={
                <ProtectedRoute>
                  <DashboardTemplate>
                     <Overview />
                  </DashboardTemplate>
                </ProtectedRoute> }/>
            <Route path="dashboard/transactions" element={
               <ProtectedRoute>
                  <DashboardTemplate>
                     <Transactions />
                  </DashboardTemplate>
                </ProtectedRoute>}/>
            <Route path="dashboard/profile" element={
                <ProtectedRoute>
                  <DashboardTemplate>
                     <Profile />
                  </DashboardTemplate>
                </ProtectedRoute>}/>
          </Routes>
        </Router>   
        </>
  )
}

export default App
