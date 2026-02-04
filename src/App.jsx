import LandingPage from "./components/LandingPage/LandingPage";
import Overview from "./components/Overview/Overview";
import Transactions from "./components/Transactions/Transactions";
import Profile from "./components/Profile/Profile";
import "./assets/styles/main.css";
import DashboardTemplate from "./components/DashboardTemplate/DashboardTemplate";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRedirect from "./components/LoginRedirect";
import { Navigate } from "react-router-dom";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";

function App() {

  return ( 
        <>
         <Router>
            <Routes>
               <Route index element={
                  <LoginAndRegister /> }/>
               <Route path="dashboard/overview" element={
                  <DashboardTemplate>
                     <Overview />
                  </DashboardTemplate> }/>
               <Route path="dashboard/transactions" element={
                  <DashboardTemplate>
                     <Transactions />
                  </DashboardTemplate>}/>
               <Route path="dashboard/profile" element={
                  <DashboardTemplate>
                     <Profile />
                  </DashboardTemplate> }/>
            </Routes>
            </Router>   
        </>
  )
}

export default App;
