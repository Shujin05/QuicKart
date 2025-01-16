import {useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import OrderStatus from "../components/OrderStatus"
import {AuthContext} from "../context/AuthContext"
import axios from "axios"
import {formatDate} from "../util.js"

const Transaction = () => {
    const [orders, setOrders] = useState([])
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchData = async() => {
            if (!token) {
                navigate("/login")
                return;
            }
            try {
                const res = await axios.get("api/order/findOrderByUser", {headers: {token: token}})
                if (res.data.success) {
                    const data = res.data.data;
                    const newArray = [];
                    for (let item of data) {
                        newArray.push({
                            id: item._id,
                            item: item.item,
                            date: formatDate(item.createdAt),
                            quantity: item.quantity,
                        })
                    }
                    setOrders(newArray)
                } 
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    })
    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Transaction History</h1>
            </div>
            <div className="transaction-table">
                {orders.length > 0 ?
                    <>
                        <div className="transaction-item transaction-header">
                            <p>Item</p>
                            <p>Quantity</p>
                            <p>Price</p>
                            <p>Order created</p>
                        </div>
                        {orders.map((order)=> {
                            return <div key={order.id} className="transaction-item">
                                <div><p>{order.item}</p></div>
                                <div><p>{order.quantity}</p></div>
                                <div><p>15 credits</p></div>
                                <div><p>{order.date}</p></div>
                            </div>
                        })}
                    </> : <h2>No transactions have been made. Go to <b><u><a href="/products">Products</a></u></b> to start shopping!</h2>}
                
                
            </div>
            
        </div>
    )
}

export default Transaction;

