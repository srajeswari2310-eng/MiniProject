import React from 'react'
import {Outlet} from 'react-router-dom'

import NavBar from '../Components/NavBar'


function RootLayout({isUserLogged}){


  return !isUserLogged ? (
   // If not logged in, show whatever child route (LoginPage or ForgotPassword)
    <Outlet />
   )  : (
 <>
    <NavBar/>
    <Outlet/>
 </>   
  )
}

export default RootLayout