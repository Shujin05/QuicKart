import {useState, useEffect, useContext} from "react"
import axios from "axios"
import {AuthContext} from "../context/AuthContext"

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
                for (let item of data) {
                    const date = new Date(item.createdAt);

                    // what is this monstrosity
                    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${
                        String(date.getMonth() + 1).padStart(2, "0")
                      }/${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${
                        String(date.getMinutes()).padStart(2, "0")
                      }:${String(date.getSeconds()).padStart(2, "0")}`;

                    newArray.push({
                        id: item._id,
                        user: item.userID,
                        item: item.itemID,
                        quantity: item.quantityRequested,
                        date: formattedDate
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