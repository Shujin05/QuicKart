import {useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import useToast from "../hooks/useToast"

const UserActionConfirm = forwardRef((props, ref) => {
    const [modalInfo, setModalInfo] = useState({
        userID: "",
        email: "",
        message: "",
        type: "",
    })

    const [passwordInput, setPasswordInput] = useState({
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")

    const modalRef = useRef(null)

    const {token} = useContext(AuthContext);

    const {toastSuccess, toastError} = useToast();

    const navigate = useNavigate()

    useImperativeHandle(ref, ()=>{
        return {
            triggerModal(info) {
                if (modalRef) {
                    modalRef.current.style.display = "block"
                    setModalInfo(info)
                }
            },
        }
    }, [modalRef])

    // detect modal close
    useEffect(() => {
        function detectClick(e) {
            if (modalRef && e.target === modalRef.current) {
                setError("")
                setPasswordInput({password: "", confirmPassword: ""})
                modalRef.current.style.display = "none";
            }
        }

        document.addEventListener("click", detectClick, false);

        return () => {
            document.removeEventListener("keydown", detectClick, false);
        };
    }, [modalRef])
    
    function closeModal() {
        if (modalRef) {
            setError("")
            setPasswordInput({password: "", confirmPassword: ""})
            modalRef.current.style.display = "none";
        }
    }

    function submitForm() {
        if (modalInfo.type === "suspend") {
            suspendUser()
        } else if (modalInfo.type === "reset") {
            resetPassword()
        } else if (modalInfo.type === "reactivate") {
            reactivateUser()
        }
    }

    const suspendUser = async() => {
        try {
            const res = await axios.post("api/admin/suspendUser", {userEmail: modalInfo.email}, {headers: {token: token}})
            if (!res.data.success) {
                setError(res.data.message)
                return
            } 

            toastSuccess("User has been suspended");
            closeModal();
            props.refresh()
        } catch(err) {
            console.log(err)
            setError("something went wrong!")
        }  
    }

    const reactivateUser = async() => {
        try {
            const res = await axios.post("api/admin/reactivateUser", {userEmail: modalInfo.email}, {headers: {token: token}})
            if (!res.data.success) {
                setError(res.data.message)
                return
            } 

            toastSuccess("User account has been reactivated");
            closeModal();
            props.refresh()
        } catch(err) {
            console.log(err)
            setError("something went wrong!")
        }  
    }

    const resetPassword = async() => {
        const data = {
            userEmail: modalInfo.email,
            newPassword: passwordInput.password,
            confirmPassword: passwordInput.confirmPassword
        }

        try {
            const res = await axios.post("api/admin/resetPassword", data, {headers: {token: token}})
            if (!res.data.success) {
                setError(res.data.message)
                return
            } 

            toastSuccess("Password has been reset");
            closeModal();
            props.refresh()
        } catch(err) {
            console.log(err)
            setError("something went wrong!")
        }  
    }

    function handleChange(e) {
        setPasswordInput((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="confirm-content">

                <h2>Confirm Action</h2>
                <p>{modalInfo.message}</p>
                {modalInfo.type === "reset" 
                    ? <div style={{display: "flex", flexDirection: "column", marginBottom: "16px"}}>
                    <input required type="password" placeholder="New password" name="password" onChange={handleChange} value={passwordInput.password}></input>
                    <input required type="password" placeholder="Confirm password" name="confirmPassword" onChange={handleChange} value={passwordInput.confirmPassword}></input>
                </div> : <></>}
                <p className="error-text">{error}</p>
                <div>
                    <button style={{marginRight: "8px"}} onClick={submitForm}>Confirm</button>
                    <button onClick={closeModal}>Go back</button>
                </div>
            </div>
        </div>
    )
})

export default UserActionConfirm;