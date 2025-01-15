import {useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import OrderStatus from "../components/OrderStatus"
import {AuthContext} from "../context/AuthContext"

const Transaction = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchData = async() => {
            if (!token) {
                navigate("/login")
                return;
            }
        }
    })
    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Transaction History</h1>
            </div>
            <div className="transaction-table">
                <div className="transaction-item transaction-header">
                    <p>Item</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Order created</p>
                    <p>Status</p>
                </div>
                <div className="transaction-item">
                    <div><p>Milo</p></div>
                    <div><p>2</p></div>
                    <div><p>15 credits</p></div>
                    <div><p>15/1/2025</p></div>
                    <div>
                        <OrderStatus status="approved"/>
                    </div>
                </div>
                <div className="transaction-item">
                    <div><p>Milo</p></div>
                    <div><p>2</p></div>
                    <div><p>15 credits</p></div>
                    <div><p>15/1/2025</p></div>
                    <div>
                        <OrderStatus status="rejected"/>
                    </div>
                </div>
                <div className="transaction-item">
                    <div><p>Milo</p></div>
                    <div><p>2</p></div>
                    <div><p>15 credits</p></div>
                    <div><p>15/1/2025</p></div>
                    <div>
                        <OrderStatus status="pending"/>
                    </div>
                </div>
                <div className="transaction-item">
                    <div><p>Milo</p></div>
                    <div><p>2</p></div>
                    <div><p>15 credits</p></div>
                    <div><p>15/1/2025</p></div>
                    <div>
                        <OrderStatus status="pending"/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Transaction;

