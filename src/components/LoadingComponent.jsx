import { useAuth0 } from '@auth0/auth0-react';

export default function LoadingComponent() {
const { isLoading, error, isAuthenticated } = useAuth0();

    return (
        <>
            {error && <p>Authentication Error</p>}
            {!error && isLoading && <p>Loading...</p>}
        </>      
    )
}