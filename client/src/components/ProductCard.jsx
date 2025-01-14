const ProductCard = (props) => {
    return (
        <div className="product-card">
            <img src="milo.jpg" alt="milo"></img>
            <div className="product-card-content">
                <h2>Milo</h2>
                <h3>15 credits</h3>
                <p style={{marginBottom: "32px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <button>Place order</button>
            </div>
        </div>
    )
}

export default ProductCard