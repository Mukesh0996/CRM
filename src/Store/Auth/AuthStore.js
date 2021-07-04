import React, { useState } from 'react';
import AuthContext from './AuthContext';


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [orgId, setOrgId] = useState(localStorage.getItem("orgId"));

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