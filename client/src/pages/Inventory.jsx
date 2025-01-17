import { useState, useRef, useContext, useEffect } from "react"
import AddOrderPopUp from "../components/AddOrderPopUp"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
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

const Inventory = () => {
    const modalRef = useRef(null);
    function triggerModal(id) {
        if (!modalRef) return;
        for (let item of inventory) {
            if (item.id === id) {
                modalRef.current.triggerModal({
                    id: item.id,
                    name: item.name,
                    stock: item.quantity,
                    price: item.price,
                    quantity: item.quantity,
                    status: item.status,
                    imagePath: item.imagePath
                });
                return;
            }
        }
        
    }
    const [inventory, setInventory] = useState([])
    const [refresh, setRefresh] = useState(true);
    const { token, isAdmin } = useContext(AuthContext)
    const {toastSuccess, toastError} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (!refresh) return;
        if (!token) {
            toastError("Log in as admin to access this page")
            navigate("/login")
            return
        }

        if (!isAdmin) {
            toastError("Log in as admin to access this page")
            navigate("/")
            return
        }
        const fetchData = async () => {
            setRefresh(false)
            const inv = await axios.get("api/item/list", { header: { token: token } })
            if (inv.data.success) {
                const data = inv.data.data;
                console.log(data)
                const newArray1 = []
                for (let item of data) {
                    newArray1.push({
                        id: item._id,
                        name: item.name,
                        price: item.voucherAmount,
                        quantity: item.quantity,
                        homepageQuantity: item.homepageQuantity,
                        status: item.status,
                        imagePath: item.image
                    })
                }
                setInventory(newArray1)
            }
        }
        fetchData();
    }, [refresh])

    function refreshPage() {
        setRefresh(true);
    }
    return (
        <>
        <div style={{textAlign: "left"}}>
            <h1>Inventory Summary</h1>
            <div id="row2">
                <div className="inventoryList-list">

                    <div className="inventoryList-item">
                        <b>Name</b>
                        <b>Price</b>
                        <b>Quantity</b>
                        <b>Projected Quantity</b>
                        <b>Status</b>
                        <b>Actions</b>
                    </div>
                    {inventory.map((item)=> {
                        return (
                            <div key={item.id} className="inventoryList-item">
                                <b>{item.name}</b>
                                <b>{item.price}</b>
                                <b>{item.quantity}</b>
                                <b>{item.homepageQuantity}</b>
                                <div style={{display: "flex"}}>
                                {item.status === "in-stock" 
                                    ? <InStock/>
                                    : <OutOfStock/>}
                                </div>
                                
                                <button onClick={()=>triggerModal(item.id)}>
                                    Update Quantity
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    <div className="inventoryList-footer">
        <p>© 2025 Your Company. All rights reserved.</p>
    </div>
    <AddOrderPopUp ref={modalRef} refresh={refreshPage}/>
    </>
        
    )
}

export default Inventory;

