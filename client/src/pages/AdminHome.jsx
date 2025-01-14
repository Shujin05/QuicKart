import {
  
} from "react-router-dom";

const RequestStatus = (props) => {
    return (
        <div className={`request-status request-status-${props.status}`}>
            <p>{props.status}</p>
        </div>
    )
}

const QuantityStatus = (props) => {
    return (
        <div className={`quantity-status quantity-status-${props.status}`}>
            <p>{props.status}</p>
        </div>
    )
}
    
function AdminHome(){
    return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Welcome back, Admin</h1>
      </div>

      <div className="admin-name">
        <div className="admin-section">
          <h2>Weekly Requests</h2>
          <p>View the summary of requests submitted this week.</p>
          <div id="row1">
                <div className="request-list">
                    <div className="request-item">
                        <b>User</b>
                        <b>Product</b>
                        <b>Price</b>
                        <b>Request Date</b>
                        <b>Status</b>
                    </div>
                    <div className="request-item">
                        <p>User A</p>
                        <p>Item 1</p>
                        <p>10 Credits</p>
                        <p>01/01/2025</p>
                        <div style={{display: "flex"}}>
                                <RequestStatus status="approved"/>
                                <RequestStatus status="rejected"/>
                        </div>
                    </div>
                    <div className="request-item">
                        <p>User B</p>                            
                        <p>Item 2</p>
                        <p>8 Credits</p>
                        <p>02/01/2025</p>
                        <div style={{display: "flex"}}>
                                <RequestStatus status="approved"/>
                                <RequestStatus status="rejected"/>
                        </div>
                    </div>
                    <div className="request-item">
                        <p>User C</p>
                        <p>Item 3</p>
                        <p>12 Credits</p>
                        <p>04/01/2025</p>
                        <div style={{display: "flex"}}>
                                <RequestStatus status="approved"/>
                                <RequestStatus status="rejected"/>
                        </div>
                    </div>
                </div>
                <div className="admin-request-header">   
                    <a href="/transactions">{"View All >"}</a>
                </div>
            </div>        
        </div>
    

        <div className="admin-section">
          <h2>Inventory Summary</h2>
          <p>Check the current inventory status at a glance.</p>
          <div id="row2">
                <div className="inventory-list">
                    <div className="inventory-item">
                        <b>Product</b>
                        <b>Price</b>
                        <b>Quantity</b>
                        <b>Restock Date</b>
                    </div>
                    <div className="inventory-item">
                        <p>Item 1</p>
                        <p>10 Credits</p>
                        <div style={{display: "flex"}}>
                                <QuantityStatus status="moderate"/>                        </div>
                        <p>12/01/2025</p>
                        
                    </div>
                    <div className="inventory-item">
                        <p>Item 2</p>                            
                        <p>8 Credits</p>
                        <div style={{display: "flex"}}>
                                <QuantityStatus status="high"/>
                        </div>
                        <p>02/02/2025</p>

                    </div>
                    <div className="inventory-item">
                        <p>Item 3</p>
                        <p>12 Credits</p>
                        <div style={{display: "flex"}}>
                                <QuantityStatus status="low"/>
                        </div>
                        <p>27/01/2025</p>

                    </div>
                </div>
                <div className="inventory-header">   
                    <a href="/inventory">{"View All >"}</a>
                </div>
            </div>        
            </div>
      </div>

      <div className="admin-footer">
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
    )
}

export default AdminHome;

