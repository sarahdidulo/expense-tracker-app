import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../CurrentUserContext';

export default function LoginAndRegister() {
    
    //state current form is login or sign up form
    const [currentForm, setCurrentForm] = useState('login form');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState(null);
    const { currentUser, logUserDetails } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        console.log(`entered login function. email: ` + email + ` | password` + password)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            withCredentials: true, 
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        } 
        try {
            const response = await fetch("http://localhost:4000/be-et/auth/login", requestOptions);
            const data = await response.json();
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user_id", data.user._id);
            logUserDetails(data.user._id, data.user.name, data.token);
            navigate('/dashboard/overview');
        } catch (err) {
            console.log(err);
        }
    }

    function loginForm () {
        return (
            <div className="login-form-wrapper">
                <h2>Login Form</h2>
                <form className="login-form" onSubmit={login}>
                    <label>
                        Email:
                        <input type="text" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder="Enter your email" />
                    </label>
                    <br />
                    <label>
                        Password
                        <input type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="Enter your password" />
                    </label>
                    <br />
                    <button>Login</button>  
                    <button onClick={()=> {setCurrentForm('sign up form')}}>Sign Up</button>             
                </form>
            </div>
        );    
    }

    async function signup (e) {
        e.preventDefault();
        console.log(`entered sign up function. email: ` + email + ` | password` + password)
        if(confirmPassword !== password) {
            setValidatePassword(false);
        } else if(confirmPassword === password) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true, 
                credentials: "include",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            } 
            try {
                const response = await fetch("http://localhost:4000/be-et/auth/register", requestOptions);
                const data = await response.json();
                setValidatePassword(null);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
    }

    function signUpForm () {
        return (
            <div className="sign-up-form-wrapper">
                <h2>Sign Up Form</h2>
                <form className="sign-up-form" onSubmit={signup}>
                    <label>
                        Name:
                        <input type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        placeholder="Enter your name" />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="text" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder="Enter your email" />
                    </label>
                    <br />
                    <label>
                        Password
                        <input type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="Enter your password" />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input type="password" 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)} 
                        placeholder="Confirm your password" />
                    </label> 
                    { validatePassword === false && <p style="color: red;">Passwords do not match.</p> }
                    <br />
                    <button>Submit</button>   
                    <button onClick={()=> {setCurrentForm('login form')}}>Login</button>            
                </form>
            </div>
        );
    }
    

    return (
        <div className="log-reg-form-wrapper">
            <h1>Login and Register form</h1>
           {currentForm === 'login form' ? loginForm() : signUpForm() }
        </div>
    );
}