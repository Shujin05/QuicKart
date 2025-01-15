import {useState, useEffect, forwardRef, useImperativeHandle, useRef} from "react"

const OrderModal = forwardRef((props, ref) => {
    const [modalInfo, setModalInfo] = useState({
        id: -1,
        name: "",
        stock: 0,
        price: 10,
        quantity: 1
    })

    const modalRef = useRef(null)

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
        console.log("submit order")
        closeModal()
    }
    
    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-content">
                <img src="/milo.jpg" alt="milo"></img>
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
                    <button onClick={submitOrder}>Place Order</button>
                </div>
                
            </div>

        </div>
    )
})

export default OrderModal;