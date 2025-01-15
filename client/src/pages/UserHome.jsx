import {useState, useRef} from "react"
import {useNavigate} from "react-router-dom"
import ProductCard from "../components/ProductCard"
import OrderStatus from "../components/OrderStatus"
import OrderModal from "../components/OrderModal"

const UserHome = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "milo",
            stock: 3,
            price: 15
        },
        {
            id: 2,
            name: "biscuits",
            stock: 3,
            price: 15
        },
        {
            id: 3,
            name: "milk",
            stock: 5,
            price: 15
        },
        {
            id: 4,
            name: "fan",
            stock: 5,
            price: 40
        }
    ]);
    const navigate = useNavigate()
    const modalRef = useRef();

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

