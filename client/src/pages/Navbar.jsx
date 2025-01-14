import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"



const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Website</h1>
            {
                isAdmin ? <>
                    <a href="/">Home</a>
                    <a href="/products">Manage Users</a>
                    <a href="/transaction">Inventory</a>
                    <a href="/transaction">Logout</a>
                </> :
                <>
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/transaction">Transaction History</a>
                    <a href="/transaction">Logout</a>
                </>
            }
            
        </div>
    )
}

export default Navbar;

