import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../CurrentUserContext';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";

export default function Profile() {
    const { currentUser } = useContext(CurrentUserContext);
    

    return (
        <>
            { currentUser.token ? 
            <>
                <h1>Profile Content</h1>
                <Uploady destination={{ url: "https://localhost:5173/src/assets/images/avatars" }}>
                    <UploadButton/>
                </Uploady>
            </> 

        : <Navigate to="/" replace /> }   
        </>
    );
}