import { useAuth0 } from '@auth0/auth0-react'
import './LoginButton.css';

export default function LoginButton() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <div className="button-wrapper">
                <button className="button-elem" onClick={() => loginWithRedirect()}>
                    Try Now 
                    <div className="button-elem-arrow"></div>
                </button>
            </div>        
        )
    );
}