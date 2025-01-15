import {useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"


const Navbar = () => {
    const {logout, isAdmin} = useContext(AuthContext)
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        logout();
        navigate("/login");
    }

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Website</h1>
            {
                isAdmin ? <>
                    <a href="/">Home</a>
                    <a href="/requests">Requests</a>
                    <a href="/manage-user">Manage Users</a>
                    <a href="/inventory">Inventory</a>
                    <a href="/users">Users</a>
                    <a href="/transaction" onClick={handleLogout}>Logout</a>
                </> :
                <>
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/transaction">Transaction History</a>
                    <a href="/transaction" onClick={handleLogout}>Logout</a>
                </>
            }
            
        </div>
    )
}

export default Navbar;

