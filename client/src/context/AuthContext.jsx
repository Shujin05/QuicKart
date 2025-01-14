import {createContext, useEffect, useState} from "react";
import axios from "axios";

// to be updated, have no idea how jwt works
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [isAdmin, setIsAdmin] = useState(false);

    const login = async(inputs) => {
        const res = await axios.post("/api/user/login", inputs);
        if (!res.data.success) {
            return res.data.message;
        } else {
            setToken(res.data.token)
            return null;
        }
    }

    const loginAdmin = async(inputs) => {
        const res = await axios.post("/api/admin/login", inputs);
        if (!res.data.success) {
            return res.data.message;
        } else {
            setToken(res.data.token)
            return null;
        }
    }

    const register = async(inputs) => {
        const res = await axios.post("/api/user/register", inputs);
        if (!res.data.success) {
            return res.data.message;
        } else {
            setToken(res.data.token)
            return null;
        }
    }

    const logout = async(inputs) => {
        setToken(null)
    }

    useEffect(() => {
        localStorage.setItem("token", token)
    }, [token])

    useEffect(()=> {
        //verify admin here
    }, [])

    return <AuthContext.Provider value={{token, isAdmin, login, loginAdmin, register, logout}}>
        {children}
    </AuthContext.Provider>
}