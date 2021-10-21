import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';


export const AuthContextProvider = (props) => {
    
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
    const [iat, setIat] = useState(localStorage.getItem("iat"));
    const [expAt, setExpAt] = useState(localStorage.getItem("expAt"));
    const [name, setName] = useState(localStorage.getItem("userName"));

    const signOutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("orgId");
        localStorage.removeItem("expAt");
        localStorage.removeItem("iat");
        localStorage.removeItem("userName");

    }

    const signInHandler = ({token, userId, orgId, name}) => {
        console.log({token, name, userId, orgId})
        const currentTime = new Date().getTime();
        const expiryTime = currentTime + 86400000;
        
        setToken(token);
        setUserId(userId);
        setOrgId(orgId);
        setIat(currentTime);
        setExpAt(expiryTime);
        setName(name);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("orgId", orgId);
        localStorage.setItem("iat", currentTime);
        localStorage.setItem("expAt", expiryTime);
        localStorage.setItem("userName", name);
        
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
    },[iat, expAt]);
    
    const isLoggedIn = !!token && !!userId && !!orgId;

    const authContext = {
        isLoggedIn,
        token,
        userId,
        orgId,
        signIn: signInHandler,
        signOut: signOutHandler ,
        name
    }

    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
}