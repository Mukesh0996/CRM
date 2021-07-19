import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from './AuthContext';


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));
    const [iat, setIat] = useState(localStorage.getItem("iat"));
    const [expAt, setExpAt] = useState(localStorage.getItem("expAt"));
    const history = useHistory();

    const signInHandler = ({token, userId, orgId}) => {
        const currentTime = new Date().getTime();
        const expiryTime = currentTime + 10000;
        
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
    const signOutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("orgId");
        localStorage.removeItem("expAt");
        localStorage.removeItem("iat");
       window.history(null,"","/");
    }

    useEffect(() => {
       
        if(iat && expAt) {
            setTimeout(signOutHandler, localStorage.getItem("expAt") - localStorage.getItem("iat"));
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