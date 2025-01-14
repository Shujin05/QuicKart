import {createContext, useEffect, useState} from "react";
import axios from "axios";

// to be updated, have no idea how jwt works
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))

    const login = async(inputs) => {
        const res = await axios.post("/api/user/login", inputs);
        localStorage.setItem("token", res.data.token);
    }

    const logout = async(inputs) => {
        try {
            await axios.post("/api/user/logout")
        }
        catch(err){
            console.log(err)
        }
        setCurrentUser(null)
    }

    useEffect(() => {
        //localStorage.setItem("token", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>
}