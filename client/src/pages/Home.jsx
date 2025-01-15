import {useState, useContext} from "react"
import AdminHome from "./AdminHome"
import UserHome from "./UserHome"
import {AuthContext} from "../context/AuthContext"

const Home = () => {
    // when login is setup this can be checked based on the cookies
    const {isAdmin} = useContext(AuthContext);

    return (
        <>
            {
                isAdmin ? <AdminHome/> : <UserHome/>
            }
        </>
    )
}

export default Home;