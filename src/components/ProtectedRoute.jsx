import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    const { isAuthenticated } = useAuth0(); 
    
    return isAuthenticated ? children : <Navigate to="/" replace />;

};
