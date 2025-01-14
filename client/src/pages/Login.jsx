import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [error, setError] = useState("")
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    function handleChange(e) {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post("api/auth/login", inputs, function(response) {
                navigate("/")
            })
        } catch (err) {
            console.log(err)
            setError(err);
        }
    }
    return (
        <div className="login-container">
            <div className="login-inner">
                <div className="login-header">
                    <h1>Login</h1>
                </div>
                <div className="login-content">   
                    <input required type="text" placeholder="email" name="email" onChange={handleChange}></input>
                    <input required type="password" placeholder="password" name="password" onChange={handleChange}></input>
                </div>
                <div className="footer">
                    <p className="error">{error} </p>
                    <button onClick={handleSubmit}>Login</button>
                    <p>Don't have an account? <a href="/register"><u>Register</u></a> here</p>
                </div>
                
            </div>
        </div>
        
    )
}

export default Login;

