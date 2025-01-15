import {useState, useRef, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import ProductCard from "../components/ProductCard"
import OrderStatus from "../components/OrderStatus"
import OrderModal from "../components/OrderModal"
import {AuthContext} from "../context/AuthContext"
import axios from "axios"

const UserHome = () => {
    const [products, setProducts] = useState([]);

    const {token, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const modalRef = useRef();

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
    return (
        <div className="user-home-container">
            <h1>Welcome back, User</h1>
            <div id="row1">
                <div className="card">
                <h3>Voucher balance</h3>
                <h1>20 credits</h1>
                </div>
                <div className="card">
                    <div className="user-transaction-header">   
                        <h3>Recent Transactions</h3>
                        <a href="/transaction">{"View All >"}</a>
                    </div>
                    <div className="transaction-list">
                        <div className="transaction-item">
                            <b>Product</b>
                            <b>Price</b>
                            <b>Status</b>
                        </div>
                        <div className="transaction-item">
                            <p>item 1</p>
                            <p>14 credits</p>
                            <div style={{display: "flex"}}>
                                <OrderStatus status="approved"/>
                            </div>
                        </div>
                        <div className="transaction-item">
                            <p>item 1</p>
                            <p>14 credits</p>
                            <div style={{display: "flex"}}>
                                <OrderStatus status="pending"/>
                            </div>
                        </div>
                        <div className="transaction-item">
                            <p>item 1</p>
                            <p>14 credits</p>
                            <div style={{display: "flex"}}>
                                <OrderStatus status="rejected"/>
                            </div>
                        </div>
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
        </div>
        
        
    )
}

export default UserHome;

