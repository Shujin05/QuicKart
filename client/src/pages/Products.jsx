import {useState, useRef, useEffect} from "react"
import ProductCard from "../components/ProductCard"
import OrderModal from "../components/OrderModal"

const Products = () => {
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
        }
    ]);
    
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
                    quantity: 1
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
                        triggerModal={triggerModal}/>
                })}
            </div>
            <OrderModal ref={modalRef}/>
        </div>
        
    )
}

export default Products;

