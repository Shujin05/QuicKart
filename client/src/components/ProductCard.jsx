const ProductCard = (props) => {
    return (
        <div className="product-card">
            <img src="milo.jpg" alt="milo"></img>
            <div className="product-card-content">
                <h2>{props.name}</h2>
                <h3>{props.price} credits</h3>
                <p style={{marginBottom: "32px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <button onClick={() => {props.triggerModal(props.id)}}>Place order</button>
            </div>
        </div>
    )
}

export default ProductCard