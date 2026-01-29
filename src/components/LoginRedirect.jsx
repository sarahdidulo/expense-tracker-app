
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from "react-router-dom";

export default function LoginRedirect({ children }) {

    const { isAuthenticated } = useAuth0(); 
    
    return isAuthenticated ? <Navigate to="/dashboard/overview" replace /> : <Navigate to="/" replace />;

};
