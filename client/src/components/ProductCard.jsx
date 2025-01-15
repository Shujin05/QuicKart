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

const ProductCard = (props) => {
    return (
        <div className="product-card">
            <img src="milo.jpg" alt="milo" className={props.status === "out-of-stock" ? "out-of-stock" : "" }></img>
            <div className="product-card-content">
                <h2>{props.name}</h2>
                <h3>{props.price} credits</h3>
                <div style={{display: "flex"}}>
                {props.status === "out-of-stock" ?
                    <OutOfStock/> :
                    <InStock/>}
                </div>
                
                <p style={{marginBottom: "32px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <button onClick={() => {props.triggerModal(props.id)}}>
                    {
                        props.status === "out-of-stock" 
                        ? <>Pre-Order</>
                        : <>Place Order</>
                    }
                </button>
            </div>
        </div>
    )
}

export default ProductCard