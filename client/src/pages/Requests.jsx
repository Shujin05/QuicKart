import {useState, useEffect, useContext} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import {formatDate} from "../util.js"

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const {token} = useContext(AuthContext)

    const timeZoneParams = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    }

    //const formattedDate = date.toLocaleDateString("en-US", );
      
    useEffect(()=> {
        const fetchData = async() => {
            const res = await axios.get("api/order/listOrder", {header: {token: token}})
            if (res.data.success) {
                const data = res.data.data;
                const newArray = []
                console.log(data)
                for (let item of data) {
                    newArray.push({
                        id: item._id,
                        user: item.userName,
                        item: item.itemName,
                        quantity: item.quantityRequested,
                        date: formatDate(item.createdAt)
                    })
                }
                setRequests(newArray);
            }
        }
        fetchData()
    }, [])
    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Requests</h1>
            </div>
            <div className="requests-table">
                <div className="transaction-item transaction-header">
                    <p>User</p>
                    <p>Item</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Order created</p>
                </div>
                {requests.map((request) => {
                    return (
                        <div key={request.id} className="transaction-item">
                            <p>{request.user}</p>
                            <p>{request.item}</p>
                            <p>{request.quantity}</p>
                            <p>14 credits</p>
                            <p>{request.date}</p>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Requests