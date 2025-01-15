import {useState, useRef} from "react"
import AddOrderPopUp from "../components/AddOrderPopUp"

const Inventory = () => {
    const modalRef = useRef(null);
    function triggerModal() {
        if (modalRef) {
            console.log("help")
            modalRef.current.triggerModal();
        }
    }
    return (
        <>
            <button onClick={triggerModal}></button>
            <AddOrderPopUp ref={modalRef}/>
        </>
        
    )
}

export default Inventory;