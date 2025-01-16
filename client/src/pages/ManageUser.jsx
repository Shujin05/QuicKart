import {useState, useRef, useEffect, useContext} from "react"
import axios from "axios"
import UserActionConfirm from "../components/UserActionConfirm"
import useToast from "../hooks/useToast"
import {AuthContext} from "../context/AuthContext"

const ManageUser = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(true)

    const {toastError, toastSuccess} = useToast()
    const {token} = useContext(AuthContext)

    useEffect(()=> {
        if (!refresh) return;

        const fetchData = async() => {
            setRefresh(false)
            try {
                const res = await axios.get("api/user/listAllUsers", {headers: {token: token}});
                if (!res.data.success) {
                    toastError(res.data.message)
                    return;
                }

                const data = res.data.data;
                console.log(data)
                const newArray = []
                for (let user of data) {
                    newArray.push({
                        id: user._id,
                        username: user.name,
                        email: user.email,
                        voucherBalance: user.voucherBalance,
                        suspended: user.suspended
                    })
                }
                setUsers(newArray)
            } catch (err) {
                toastError("Fetch error: Something went wrong!")
                console.log(err);
            }
        }
        fetchData();
    }, [refresh])

    const modalRef = useRef(null)
    function triggerModal(id, email, type) {
        if (modalRef) {
            if (type === "reset") {
                modalRef.current.triggerModal({
                    userID: id,
                    email: email,
                    message: "You are about to reset the password of this user. Please key in the new password below.",
                    type: type
                });
            } else if (type === "suspend") {
                modalRef.current.triggerModal({
                    userID: id,
                    email: email,
                    message: "You are about to suspend this user. Proceed?",
                    type: type
                })
            }
            
        }
    }

    function refreshPage() {
        setRefresh(true)
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
                        <p>{user.voucherBalance} credits</p>
                        <p>{user.suspended ? "Suspended" : "Active"}</p>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <button onClick={()=>triggerModal(user.id, user.email, "reset")}>Reset Password</button>
                            {user.suspended ? 
                                <button>Reactivate</button> :
                                <button onClick={()=>triggerModal(user.id, user.email, "suspend")}>Suspend</button>}
                        </div>
                    </div>)
                })}
            </div>
            <UserActionConfirm ref={modalRef} refresh={refreshPage}/>
        </div>
    )
}

export default ManageUser;

