import React, { useEffect } from "react";
import './Profile.css';
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../CurrentUserContext';
import { BannerContext } from "../Banner/BannerContext";

export default function Profile() {
    const prod_url = import.meta.env.VITE_PROD_URL;
    const { currentUser, reLogUserDetails } = useContext(CurrentUserContext);
    const [ firstname, setFirstname ] = useState('');
    const [ middlename, setMiddlename ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const { successMessage, showSuccessMessage, clearSuccessMessage} = useContext(BannerContext);

    async function addDetails (id) {
        try {
            const response = await fetch(`${prod_url}/be-et/user/user-details/${id}`);
            const data = await response.json();
            if(data.firstname) {
                setFirstname(data.firstname);
                setMiddlename(data.middlename);
                setLastname(data.lastname);
            } else {
                console.log(data.error);
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function saveProfileDetails (e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                email: currentUser.email
            })
        }
        try {
            const response = await fetch(`${prod_url}/be-et/user/add-profile-details/`, requestOptions);
            const data = await response.json();
            if(data.success == true) {
                showSuccessMessage(true)
            } else {
                showSuccessMessage(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        addDetails(currentUser.id);
    }, [])
    return (
        <>
            { currentUser.token ? 
            <>
            <div className="profile-wrapper">
                <h1>Profile Content</h1>    
                <form className="profile-details-form" onSubmit={saveProfileDetails}>
                    <label>
                        Username:
                        <br />
                        <input type="text"
                        placeholder={currentUser.username}
                        disabled />
                    </label>
                    <label>
                        First name:
                        <br />
                        <input type="text"
                        value={firstname} 
                        onChange={(e)=>setFirstname(e.target.value)} 
                        placeholder={firstname !== "" ? firstname : `Enter your first name`} />
                    </label>
                    <label>
                        Middle Name
                        <br />
                        <input type="text"
                        value={middlename}  
                        onChange={(e)=>setMiddlename(e.target.value)} 
                        placeholder={middlename !== "" ? middlename : `Enter your middle name`} />
                    </label>
                    <label>
                        Last name
                        <br />
                        <input type="text" 
                        value={lastname}
                        onChange={(e)=>setLastname(e.target.value)} 
                        placeholder={lastname !== "" ? lastname : `Enter your last name`} />
                    </label>
                    <label>
                        Email:
                        <br />
                        <input type="text"
                        placeholder={currentUser.email}
                        disabled />
                    </label>
                    <div className="submit-profile-details-button-wrapper">
                        <button className="submit-profile-details-button">Update Details</button>     
                    </div>       
                </form>
            </div>
            </> 

        : <Navigate to="/" replace /> }   
        </>
    );
}