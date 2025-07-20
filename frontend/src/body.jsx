import Footer from './footer'
import Navbar from './navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
