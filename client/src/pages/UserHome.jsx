import {useState, useRef, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import ProductCard from "../components/ProductCard"
import OrderModal from "../components/OrderModal"
import AddVoucherPopUp from "../components/AddVoucherPopUp.jsx"
import {AuthContext} from "../context/AuthContext"
import axios from "axios"
import {formatDate} from "../util.js"

const UserHome = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([])

    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const modalRef = useRef(null);
    const voucherRef = useRef(null)

    useEffect(()=>{
        const fetchData = async() => {
            if (!token) {
                navigate("/login")
                return;
            }
            try {
                const res = await axios.get("api/item/list", {headers: {token: token}})
                if (res.data.success) {
                    const data = res.data.data;
                    const newArray = [];
                    for (let item of data) {
                        newArray.push({
                            id: item.id,
                            name: item.name,
                            stock: item.quantity,
                            price: item.voucherAmount,
                            status: item.status
                        })
                    }
                    setProducts(newArray);
                } else {
                    console.log(res.data.message)
                }

                const orderRes = await axios.get("api/order/findOrderByUser", {headers: {token: token}})
                if (res.data.success) {
                    const data = orderRes.data.data;
                    const newArray = [];
                    let counter = 0;
                    for (let item of data) {
                        newArray.push({
                            id: item._id,
                            item: item.item,
                            date: formatDate(item.createdAt),
                            quantity: item.quantity,
                        })

                        counter++;
                        if (counter >= 3) {
                            break;
                        }
                    }
                    setOrders(newArray)
                } else {
                    console.log(res.data.message)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [token])

    function viewAllProducts() {
        navigate("/products")
    }

    function triggerModal(id) {
        if (!modalRef) return;
        for (let product of products) {
            if (product.id === id) {
                modalRef.current.triggerModal({
                    id: product.id,
                    name: product.name,
                    stock: product.stock,
                    price: product.price,
                    quantity: 1
                });
                return;
            }
        }
    }

    function triggerVoucherPopUp() {
        if (voucherRef) {
            voucherRef.current.triggerModal();
        }
    }
    return (
        <div className="user-home-container">
            <h1>Welcome back, User</h1>
            <div id="row1">
                <div className="card">
                <h3>Voucher balance</h3>
                <div style={{display: "flex", alignItems: "center"}}>
                <h1>20 credits</h1>
                <button style={{marginLeft: "32px"}} onClick={triggerVoucherPopUp}>Add Voucher</button>
                </div>
                
                </div>
                <div className="card">
                    <div className="user-transaction-header">   
                        <h3>Recent Transactions</h3>
                        <a href="/transaction">{orders.length > 0 ? "View All >" : <></>}</a>
                    </div>
                    <div className="transaction-list">
                        
                        {orders.length > 0 ?
                            <>
                                <div className="transaction-item">
                                    <b>Item</b>
                                    <b>Quantity</b>
                                    <b>Price</b>
                                    <b>Date</b>
                                </div>
                                {
                                    orders.map((order)=> {
                                        return <div key={order.id} className="transaction-item">
                                            <p>{order.item}</p>
                                            <p>{order.quantity}</p>
                                            <p>14 credits</p>
                                            <p>{order.date}</p>
                                        </div>
                                    }) 
                                }
                            </>
                            :
                            <p>No recent transactions made</p>}
                    </div>
                </div>
            </div>
            <div className="rec-product-header">
                <h2>New Products</h2>
                <button onClick={viewAllProducts}>View All</button>
            </div>
            <div className="rec-product-list">
                {products.map((product) => {
                    return <ProductCard 
                            key={product.id}
                            id ={product.id}
                            name={product.name}
                            price={product.price}
                            triggerModal={triggerModal}/>
                })}
            </div>
            <OrderModal ref={modalRef}/>
            <AddVoucherPopUp ref={voucherRef}/>
        </div>
        
        
    )
}

export default UserHome;

