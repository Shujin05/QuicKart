import {useEffect, useContext, useState} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import {formatDate} from "../util.js"

const RequestStatus = (props) => {
    return (
        <div className={`request-status request-status-${props.status}`}>
            <p>{props.status}</p>
        </div>
    )
}

const QuantityStatus = (props) => {
    return (
        <div className={`quantity-status quantity-status-${props.status}`}>
            <p>{props.status}</p>
        </div>
    )
}

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
    
function AdminHome(){
    const [orders, setOrders] = useState([])
    const [inventory, setInventory] = useState([])
    const {token} = useContext(AuthContext)
    useEffect(()=> {
        const fetchData = async() => {
            const req = await axios.get("api/order/listOrder?limitQuantity=6", {header: {token: token}})
            if (req.data.success) {
                const data = req.data.data;
                const newArray = []
                for (let item of data) {
                    newArray.push({
                        id: item._id,
                        user: item.userName,
                        product: item.itemName,
                        status: item.status,
                        price: item.itemPrice,
                        quantity: item.quantityRequested,
                        date: formatDate(item.createdAt)
                    })
                }
                setOrders (newArray)
            }

            const inv = await axios.get("api/item/list", {header: {token: token}})
            if (inv.data.success) {
                const data = inv.data.data;
                const newArray1 = []
                for (let item of data) {
                    newArray1.push({
                        id: item._id,
                        name: item.name,
                        price: item.voucherAmount,
                        quantity: item.quantity,
                        status: item.status
                    })
                }
                setInventory (newArray1)
            }
        }
        fetchData();
    }, [])
    return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Welcome back, Admin</h1>
      </div>

      <div className="admin-name">
        <div className="admin-section">
          <h2>Weekly Requests</h2>
          <p>View the summary of requests submitted this week.</p>
          <div id="row1">
                <div className="request-list">
                    {orders.length > 0 
                        ? <div className="request-item">
                            <b>User</b>
                            <b>Product</b>
                            <b>Quantity</b>
                            <b>Price</b>
                            <b>Total Price</b>
                            <b>Request Date</b>
                        </div> 
                        : <h2>No orders this week!</h2>}
                    {orders.map((order)=> {
                        return (
                            <div key={order.id} className="request-item">
                                <b>{order.user}</b>
                                <b>{order.product}</b>
                                <b>{order.quantity}</b>
                                <b>{order.price}</b>
                                <b>{order.quantity * order.price}</b>
                                <b>{order.date}</b>
                            </div>
                        )
                    })}
                </div>
                {orders.length > 0 
                    ? <div className="admin-request-header">   
                        <a href="/transactions">{"View All >"}</a>
                    </div> 
                    : <></>}
                
            </div>        
        </div>
    

        <div className="admin-section">
          <h2>Inventory Summary</h2>
          <p>Check the current inventory status at a glance.</p>
          <div id="row2">
          <div className="inventory-list">
                    
                    <div className="inventory-item">
                        <b>Name</b>
                        <b>Price</b>
                        <b>Quantity</b>
                        <b>Status</b>
                    </div>
                    {inventory.map((item)=> {
                        return (
                            <div key={item.id} className="inventory-item">
                                <b>{item.name}</b>
                                <b>{item.price}</b>
                                <b>{item.quantity}</b>
                                <div style={{display: "flex"}}>
                                    {item.status === "in-stock" ?
                                        <InStock/> :
                                        <OutOfStock/>}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="inventory-header">   
                    <a href="/inventory">{"View All >"}</a>
                </div>
            </div>        
            </div>
      </div>

      <div className="admin-footer">
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
    )
}

export default AdminHome;

