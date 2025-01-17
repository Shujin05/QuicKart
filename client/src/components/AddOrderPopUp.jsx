import {useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext} from "react"
import axios from "axios"
import useToast from "../hooks/useToast"
import {AuthContext} from "../context/AuthContext"

const OrderModal = forwardRef((props, ref) => {
    const [modalInfo, setModalInfo] = useState({
        id: "",
        name: "",
        stock: 0,
        price: 10,
        quantity: 1,
        status: "",
        imagePath: ""
    })

    const modalRef = useRef(null)
    const {toastSuccess, toastError} = useToast()
    const {token} = useContext(AuthContext)

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
    // DONT CHANGE
    useEffect(() => {
        function detectClick(e) {
            if (modalRef && e.target === modalRef.current) {
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
            modalRef.current.style.display = "none";
        }
    }
// for your reference
    function addQuantity() {
        setModalInfo((prev)=> ({...prev, quantity: prev.quantity + 1}))
    }

    function decreaseQuantity() {
        if (modalInfo.quantity > 1) {
            setModalInfo((prev)=> ({...prev, quantity: prev.quantity - 1}))
        }
    }

    function submitOrder() {
        const postData = async() => {
            const data = {
                itemID: modalInfo.id,
                quantity: modalInfo.quantity - modalInfo.stock
            }
            try {
                const res = await axios.post("api/item/updateQuantity", data, {headers: {token: token}})
                if (!res.data.success) {
                    toastError("Something went wrong")
                    return
                } else {
                    toastSuccess("Updated item quantity")
                    props.refresh()
                    closeModal();
                }
            } catch(err) {
                console.log(err)
                toastError("Something went wrong")
            }
        }
        postData();
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-content">
                <img src={modalInfo.imagePath} alt={modalInfo.name}></img>
                <div className="modal-description">
                    <h2>{modalInfo.name}</h2>
                    <p><b>Stock: {modalInfo.stock}</b></p>
                    <p><b>Price: {modalInfo.price} credits</b></p>
                    <p>Description: Chocolate-flavoured malted powder product produced by Nestlé</p>
                    <div className="quantity-div">
                        <button onClick={decreaseQuantity}><p>-</p></button>
                        <p className="number-text"><b>{modalInfo.quantity}</b></p>
                        <button onClick={addQuantity}><p>+</p></button>
                    </div>
                    <button onClick={submitOrder}>Update Quantity</button>
                </div>
                
            </div>

        </div>
    )
})

export default OrderModal;