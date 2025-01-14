import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"



const Navbar = () => {
    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Website</h1>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/transaction">Transaction History</a>
            <a href="/transaction">Logout</a>
        </div>
    )
}

export default Navbar;

