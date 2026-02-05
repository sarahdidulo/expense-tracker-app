import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../CurrentUserContext';

export default function Profile() {
    const { currentUser } = useContext(CurrentUserContext);
    

    return (
        <>
            { currentUser.token ? 
            <>
                <h1>Profile Content</h1>
            </> 

        : <Navigate to="/" replace /> }   
        </>
    );
}