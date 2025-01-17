import {useState, useContext, useEffect} from "react"
import AdminHome from "./AdminHome"
import UserHome from "./UserHome"
import {AuthContext} from "../context/AuthContext"

const Home = () => {
    const { isAdmin } = useContext(AuthContext);

    const renderComponent = () => {
        if (isAdmin) {
            return <AdminHome />;
        }
        return <UserHome />;
    };

    return <>{renderComponent()}</>;
};

export default Home;