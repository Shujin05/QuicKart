import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {
    const [error, setError] = useState("")
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const {loginAdmin} = useContext(AuthContext)

    function handleChange(e) {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const err = await loginAdmin(inputs);
        if (err) {
            setError(err)
        } else {
            navigate("/")
        }
    }
    return (
        <div className="login-container">
            <div className="login-inner">
                <div className="login-header">
                    <h1>Admin Login</h1>
                </div>
                <div className="login-content">
                    
                    <input required type="text" placeholder="email" name="email" onChange={handleChange}></input>
                    <input required type="password" placeholder="password" name="password" onChange={handleChange}></input>
                </div>
                <div className="footer">
                    <p className="error">{error} </p>
                    <button onClick={handleSubmit}>Login</button>
                    <p>Click <a href="/login"><u>here</u></a> for user login</p>
                </div>
                
            </div>
        </div>
        
    )
}

export default AdminLogin;

