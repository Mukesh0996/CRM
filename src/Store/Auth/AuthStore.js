import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
    const [iat, setIat] = useState(localStorage.getItem("iat"));
    const [expAt, setExpAt] = useState(localStorage.getItem("expAt"));

    const signOutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("orgId");
        localStorage.removeItem("expAt");
        localStorage.removeItem("iat");
        
    }

    const signInHandler = ({token, userId, orgId}) => {
        const currentTime = new Date().getTime();
        const expiryTime = currentTime + 86400000;
        
        setToken(token);
        setUserId(userId);
        setOrgId(orgId);
        setIat(currentTime);
        setExpAt(expiryTime);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("orgId", orgId);
        localStorage.setItem("iat", currentTime);
        localStorage.setItem("expAt", expiryTime);
        
    }

    if(new Date().getTime() > Number(expAt) && Number(expAt) !== 0) {
        signOutHandler();
    }

     else if(new Date().getTime() > iat && new Date().getTime() < expAt) {
        localStorage.setItem("iat", new Date().getTime());
        setIat(new Date().getTime());
    }

    useEffect(() => {
        if(iat && expAt) {
            setTimeout(signOutHandler, Number(expAt) - Number(iat));
        }
    },[iat, expAt])

   

    const isLoggedIn = !!token && !!userId && !!orgId;
    const authContext = {
        isLoggedIn,
        token,
        userId,
        orgId,
        signIn: signInHandler,
        signOut: signOutHandler 
    }
    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>

}