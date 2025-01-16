import {useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import useToast from "../hooks/useToast"

const AddVoucherPopUp = forwardRef((props, ref) => {
    const [voucherCode, setVoucherCode] = useState("")
    const [error, setError] = useState("")

    const modalRef = useRef(null)

    const {token} = useContext(AuthContext);

    const {toastSuccess, toastError} = useToast();

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
                setVoucherCode("")
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
        const postData = async() => {
            if (voucherCode !== "voucher") {
                setError("Invalid voucher code")
                return
            }
            //await axios.post("api/user/addVoucher")
            toastSuccess("Voucher added to balance!")
            closeModal()
        }
        postData();

    }

    function handleChange(e) {
        setVoucherCode(e.target.value)
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="confirm-content">

                <h2>Enter Voucher Code</h2>
                <input required type="text" placeholder="Voucher Code" name="voucherCode" onChange={handleChange} value={voucherCode}></input>
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