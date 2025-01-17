import {useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import useToast from "../hooks/useToast"

const InStock = () => {
    return (
        <div className={"order-status order-status-approved"}>
            <p style={{margin: "0px"}}>In Stock</p>
        </div>
    )
}

const OutOfStock = () => {
    return (
        <div className={"order-status order-status-pending"}>
            <p style={{margin: "0px"}}>Out Of Stock</p>
        </div>
    )
}

const OrderModal = forwardRef((props, ref) => {
    const [modalInfo, setModalInfo] = useState({
        id: -1,
        name: "",
        stock: 0,
        price: 0,
        quantity: 1,
        status: "in-stock"
    })

    const [error, setError] = useState("")

    const modalRef = useRef(null)

    const {token} = useContext(AuthContext);

    const {toastSuccess} = useToast()

    useImperativeHandle(ref, ()=>{
        return {
            triggerModal(info) {
                if (modalRef) {
                    console.log("trigger")
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

    function addQuantity() {
        if (modalInfo.quantity < modalInfo.stock) {
            setModalInfo((prev)=> ({...prev, quantity: prev.quantity + 1}))
        }
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
                quantityRequested: modalInfo.quantity 
            }
    
            try {
                const res = await axios.post("api/order/addOrder", data, {headers: {token: token}})
                if (!res.data.success) {
                    setError(res.data.message)
                    return;
                } else {
                    toastSuccess("Order placed successfully!")
                    closeModal()
                    props.refresh()
                }
            } catch(err) {
                console.log(err)
                setError(err.response.data.message)
                
            }
        }
        postData()
        
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-content">
                <img src="/milo.jpg" alt="milo" className={modalInfo.status}></img>
                <div className="modal-description">
                    <h2>{modalInfo.name}</h2>
                    <p><b>Price: {modalInfo.price} credits</b></p>
                    <div style={{display: "flex"}}>
                    {modalInfo.status === "out-of-stock" 
                        ? <OutOfStock/>
                        : <InStock/>}
                    </div>
                    <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <div className="quantity-div">
                        <button onClick={decreaseQuantity}><p>-</p></button>
                        <p className="number-text"><b>{modalInfo.quantity}</b></p>
                        <button onClick={addQuantity}><p>+</p></button>
                    </div>
                    
                    <button onClick={submitOrder}>{
                        modalInfo.status === "out-of-stock"
                        ? <>Pre-order</>
                        : <>Place Order</>
                    }</button>
                    <p style={{color: "red"}}>{error}</p>
                </div>
            </div>
        </div>
    )
})

export default OrderModal;