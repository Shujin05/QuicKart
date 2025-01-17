# QuicKart (Hack for Good 2025) 

QuicKart is a web-based Minimart and Voucher System designed for **Muhammadiyah Welfare Home**. The platform empowers users to request products and earn vouchers while equipping administrators with robust tools for management and reporting. With a focus on security, usability, and efficient transaction processing. This is our submission for Hack for Good 2025. 

---

## Features  

### For Users:  
1. **Authentication**: Sign up, log in, and manage your password securely.  
2. **Earn Vouchers**: Redeem voucher credits by entering voucher codes.  
3. **Place Orders**:  
   - Request items in stock.  
   - Make pre-orders for out-of-stock items.  
4. **Transaction History**: View all past orders and track purchases easily.  

### For Admins:  
1. **User Management**:  
   - Add new users.  
   - Suspend accounts as needed.  
   - Reset user passwords.  
2. **Inventory Management**:  
   - Add, remove, or update item quantities for seamless stock tracking.  
3. **Order Management**:  
   - Track and manage user order requests.  
   - Mark orders as delivered.  
4. **Logs for Accountability**: Maintain detailed logs for inventory updates to ensure transparency.  
5. **Weekly Summary Reports**: Generate reports summarizing inventory status and order trends.  

---

## Tech Stack  

- **Frontend**: React.js  
- **Backend**: Node.js  
- **Database**: MongoDB  

---

## Installation  

### Prerequisites:  
- Node.js installed  
- MongoDB set up locally or in the cloud  

### Steps:  
1. Clone the repository:  
   ```bash  
   git clone <repository-url>  
   cd quickart
   ```

2. Install dependencies:
   ```bash  
   npm install  
   ```

3. Start backend server
   ```bash
   cd backend
   npm run start  
   ```
   
4. Ensure Vite is installed
   run: 
    ```bash
   cd client
   npm list vite  
   ```

    If it doesn't show Vite as a dependecy, install Vite by running:
   ```bash
   npm install vite  
   ```

6. Run the webpage
    ```bash
   cd client
   npm run dev  
   ```


