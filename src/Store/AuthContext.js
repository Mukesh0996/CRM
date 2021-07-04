import React from 'react';

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    userId:"",
    orgId:"",
    signIn: ()=> {},
    signOut: () => {}
})

export default AuthContext;