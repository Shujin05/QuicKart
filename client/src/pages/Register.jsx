import {useState} from "react"

const Register = () => {
    const [error, setError] = useState("")
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        confirm: ""
    })

    function handleChange(e) {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Password does not match!")
            return; 
        }

        try {
            
        } catch (err) {
            console.log(err)
            setError(err);
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
                    <input required type="password" placeholder="confirm password" name="confirm" onChange={handleChange}></input>
                </div>
                <div className="footer">
                    <p className="error">{error} </p>
                    <button onClick={handleSubmit}>Login</button>
                    <p>Already have an account? <a href="/login"><u>Log in</u></a> here</p>
                </div>
                
            </div>
        </div>
        
    )
}

export default Register;

