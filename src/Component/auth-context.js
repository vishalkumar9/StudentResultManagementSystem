import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn:false,
    userId:null,
    userName:null,
    role:null,
    login:() => {},
    logout:() => {}
});