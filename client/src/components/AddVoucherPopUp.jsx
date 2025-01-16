import {useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"

const AddVoucherPopUp = forwardRef((props, ref) => {
    const [voucherCode, setVoucherCode] = useState("")
    const [error, setError] = useState("")

    const modalRef = useRef(null)

    const {token} = useContext(AuthContext);

    useImperativeHandle(ref, ()=>{
        return {
            triggerModal() {
                if (modalRef) {
                    modalRef.current.style.display = "block"
                    
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
            setVoucherCode("")
            modalRef.current.style.display = "none";
        }
    }

    function submitForm() {
        if (voucherCode === "voucher") {
            console.log("voucher added")
            closeModal()
        } else {
            setError("Invalid voucher code")
        }
        
    }

    function handleChange(e) {
        setVoucherCode(e.target.value)
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="confirm-content">

                <h2>Enter Voucher Code</h2>
                <input required type="text" placeholder="Voucher Code" name="voucherCode" onChange={handleChange}></input>
                <p className="error-text">{error}</p>
                <div>
                    <button style={{marginRight: "8px"}} onClick={submitForm}>Add</button>
                    <button onClick={closeModal}>Go back</button>
                </div>
            </div>
        </div>
    )
})

export default AddVoucherPopUp;