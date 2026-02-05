import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Overview() {

    const { currentUser } = useContext(CurrentUserContext);

    return (
        <>
            <h1>Overview Content</h1>
        </>
 
    );
}