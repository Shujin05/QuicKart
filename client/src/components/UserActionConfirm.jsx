import {useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"

const UserActionConfirm = forwardRef((props, ref) => {
    const [modalInfo, setModalInfo] = useState({
        message: "",
        type: "",
    })

    const [error, setError] = useState("")

    const modalRef = useRef(null)

    const {token} = useContext(AuthContext);

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
            modalRef.current.style.display = "none";
        }
    }

    function submitForm() {
        console.log("submit");
        closeModal()
    }

    function handleChange(e) {
        setModalInfo((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="confirm-content">

                <h2>Confirm Action</h2>
                <p>{modalInfo.message}</p>
                {modalInfo.type === "reset" 
                    ? <div style={{display: "flex", flexDirection: "column", marginBottom: "16px"}}>
                    <input required type="password" placeholder="New password" name="password" onChange={handleChange}></input>
                    <input required type="password" placeholder="Confirm password" name="confirmPassword" onChange={handleChange}></input>
                </div> : <></>}
                <p className="error-text">{error}</p>
                <div>
                    <button style={{marginRight: "8px"}}>Confirm</button>
                    <button onClick={closeModal}>Go back</button>
                </div>
            </div>
        </div>
    )
})

export default UserActionConfirm;