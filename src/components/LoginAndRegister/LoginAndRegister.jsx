import { useState } from 'react';

export default function LoginAndRegister() {
    //state current form is login or sign up form
    const [currentForm, setCurrentForm] = useState('login form');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function login() {
        console.log('logged in')
        return null;
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

    function signup () {
        console.log('signed up')
        return null;
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