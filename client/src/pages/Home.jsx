import {useState} from "react"
import AdminHome from "./AdminHome"
import UserHome from "./UserHome"

const Home = () => {
    // when login is setup this can be checked based on the cookies
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <>
            {
                isAdmin ? <AdminHome/> : <UserHome/>
            }
        </>
    )
}

export default Home;