const OrderStatus = (props) => {
    return (
        <div className={`order-status order-status-${props.status}`}>
            <p>{props.status}</p>
        </div>
    )
}

export default OrderStatus;