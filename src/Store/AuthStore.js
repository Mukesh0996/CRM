import React, { useState } from 'react';
import AuthContext from './AuthContext';


export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const initialuserId = localStorage.getItem("userId");
    const initialorgId = localStorage.getItem("orgId");
    
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialuserId);
    const [orgId, setOrgId] = useState(initialorgId);


    const signInHandler = ({token, userId, orgId}) => {
        setToken(token);
        setUserId(userId);
        setOrgId(orgId);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("orgId", orgId);
    }

    const signOutHandler = () => {

    }
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

