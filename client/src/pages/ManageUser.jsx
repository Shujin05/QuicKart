import {useState, useRef} from "react"
import UserActionConfirm from "../components/UserActionConfirm"

const ManageUser = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "user1",
            email: "user1@gmail.com",
            voucher: 20,
            status: "active"
        },
        {
            id: 2,
            username: "user2",
            email: "user2@gmail.com",
            voucher: 20,
            status: "active"
        }, 
        {
            id: 3,
            username: "user3",
            email: "user3@gmail.com",
            voucher: 20,
            status: "active"
        }
    ])
    const modalRef = useRef(null)
    function triggerModal(type) {
        if (modalRef) {
            if (type === "reset") {
                modalRef.current.triggerModal({
                    message: "You are about to reset the password of this user. Proceed?",
                    type: type,
                    password: "",
                    confirmPassword: ""
                });
            } else if (type === "suspend") {
                modalRef.current.triggerModal({
                    message: "You are about to suspend the password of this user. Proceed?",
                    type: type
                })
            }
            
        }
    }
    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Manage Users</h1>
            </div>
            <div className="transaction-table">
                <div className="user-table-item transaction-header">
                    <p>Username</p>
                    <p>Email</p>
                    <p>Voucher Balance</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>
                {users.map((user)=> {
                    return (<div key={user.id} className="user-table-item">
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.voucher} credits</p>
                        <p>{user.status}</p>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <button onClick={()=>triggerModal("reset")}>Reset Password</button>
                            <button onClick={()=>triggerModal("suspend")}>Suspend</button>
                        </div>
                    </div>)
                })}
            </div>
            <UserActionConfirm ref={modalRef}/>
        </div>
    )
}

export default ManageUser;

