import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import {
  Outlet,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Navbar from "./pages/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Transaction from "./pages/Transaction"
import ManageUser from "./pages/ManageUser"
import Inventory from "./pages/Inventory"

import './App.css'
import "./styles/Login.scss"
import "./styles/Navbar.scss"
import "./styles/UserHome.scss"


function App() {
  const Layout = () => {
    return(
        <>
          <Navbar/>
          <div className="content">
            <Outlet/>
          </div>
        </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        }, 
        {
          path:"/products",
          element: <Products/>
        },
        {
          path:"/transaction",
          element: <Transaction/>
        }, 
        {
          path: "/manage-user",
          element: <ManageUser/>
        },
        {
          path: "/inventory",
          element: <Inventory/>
        }
      ]
    }, 
    {
      path: "/login", 
      element: <Login/>
    }, 
    {
      path: "/register", 
      element: <Register/>
    }
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
