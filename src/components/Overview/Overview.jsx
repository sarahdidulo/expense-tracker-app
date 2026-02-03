import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Overview() {

    const { currentUser } = useContext(CurrentUserContext);

    return (
        <>
            { currentUser.token ? 
            <>
                <h1>Overview Content</h1>
            </> 

        : <Navigate to="/" replace /> }   
        </>
 
    );
}