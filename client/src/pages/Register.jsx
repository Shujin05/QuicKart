import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Register = () => {
    const [error, setError] = useState("")
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const navigate = useNavigate();
    const {register} = useContext(AuthContext);

    function handleChange(e) {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log(inputs)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const err = await register(inputs);
        if (!err) {
            navigate("/")
        } else {
            setError(err)
        }
    }
    return (
        <div className="login-container">
            <div className="login-inner">
                <div className="login-header">
                    <h1>Register</h1>
                </div>
                <div className="login-content">   
                    <input required type="text" placeholder="username" name="name" onChange={handleChange}></input>
                    <input required type="text" placeholder="email" name="email" onChange={handleChange}></input>
                    <input required type="password" placeholder="password" name="password" onChange={handleChange}></input>
                    <input required type="password" placeholder="confirm password" name="confirm_password" onChange={handleChange}></input>
                </div>
                <div className="footer">
                    <p className="error">{error} </p>
                    <button onClick={handleSubmit}>Register</button>
                    <p>Already have an account? <a href="/login"><u>Log in</u></a> here</p>
                </div>
                
            </div>
        </div>
        
    )
}

export default Register;

