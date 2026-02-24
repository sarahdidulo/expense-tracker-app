import { createContext, useState } from "react";
import SuccessBanner from "./SuccessBanner";
import InvalidBanner from "./InvalidBanner";

export const BannerContext = createContext();

export const BannerProvider = ({children}) => {

    const checkSuccessMessage = (successMessage, data) => {
        // const tempdata = successMessage.toLowerCase();
        console.log('successMessage ', successMessage)
        if (successMessage === 'success' && data) {
            document.getElementById("success-banner-wrapper").classList.add("opacity-set");
            setTimeout(() => {
            document.getElementById("success-banner-wrapper").classList.remove("opacity-set");          
            }, 2000);
            return <SuccessBanner />;
        } else {
            document.getElementById("invalid-banner-wrapper").classList.add("opacity-set");
            setTimeout(() => {
            document.getElementById("invalid-banner-wrapper").classList.remove("opacity-set");          
            }, 2000);
            return <InvalidBanner />;
        }
    }

    return (
        <>
            <BannerContext.Provider value={{checkSuccessMessage}}>
                {children}
            </BannerContext.Provider>
        </>
    );
}

