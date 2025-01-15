import {useState, useRef, useEffect, useContext} from "react"
import {useNavigate} from "react-router-dom"
import ProductCard from "../components/ProductCard"
import OrderModal from "../components/OrderModal"
import {AuthContext} from "../context/AuthContext"
import axios from "axios"

const Products = () => {
    const [products, setProducts] = useState([]);
    const {token} = useContext(AuthContext)
    const navigate = useNavigate();

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
                            status: "out-of-stock"
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
    
    const modalRef = useRef(null);

    function triggerModal(id) {
        if (!modalRef) return;
        for (let product of products) {
            if (product.id === id) {
                modalRef.current.triggerModal({
                    id: product.id,
                    name: product.name,
                    stock: product.stock,
                    price: product.price,
                    quantity: 1,
                    status: product.status
                });
                return;
            }
        }
        
    }

    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Products</h1>
            </div>
            <div className="product-list">
                {products.map((item) => {
                    return <ProductCard 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        stock={item.stock}
                        status={item.status}
                        triggerModal={triggerModal}/>
                })}
            </div>
            <OrderModal ref={modalRef}/>
        </div>
        
    )
}

export default Products;

