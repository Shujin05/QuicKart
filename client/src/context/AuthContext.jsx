import {createContext, useEffect, useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [isAdmin, setIsAdmin] = useState(verifyAdmin || false);

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
        if (token === null) {
            localStorage.removeItem("token")
        } else {
            localStorage.setItem("token", token);
        }
        
        try {
            const decoded = jwtDecode(token);
            setIsAdmin(decoded.isAdmin);
        } catch (err) {
            return;
        }
    }, [token])

    function verifyAdmin() {
        const token = localStorage.getItem("token");
        if (!token) return false; 

        try {
            const decoded = jwtDecode(token);
            return decoded.isAdmin;
        } catch (err) {
            return false;
        }
    }

    return <AuthContext.Provider value={{token, isAdmin, login, loginAdmin, register, logout}}>
        {children}
    </AuthContext.Provider>
}