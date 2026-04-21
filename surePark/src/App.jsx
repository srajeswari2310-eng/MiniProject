import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'


import './App.css'
import RootLayout from './Layouts/RootLayout'
import LoginPage from './Pages/LoginPage';
import ForgotPassword from './Pages/ForgotPassword';
import Contact from './Pages/Contact';
import { useSelector } from 'react-redux';
import DashBoardLayout from './Layouts/DashBoardLayout';
import Home from './Pages/Home';
import SignupPage from './Pages/SignupPage';
import ManageVehicle from './Pages/ManageVehicle';
import ParkingLot from './Pages/ParkingLot';
import UserProfile from './Pages/UserProfile';
import ManageLot from './Pages/ManageLot';
import ReservationPage from './Pages/ReservationPage';
import './style.css'
import PaymentPage from './Pages/PaymentPage';
import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      ,
      {
        path: "/singup",
        element: <SignupPage />,
      }
    ],
  },
  {
    path: "/home",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        path:"/home",
        element: <Home/>,
      },      
      {
        path:"contact",
        element:<Contact/>
      },      
      {
        path:"vehicles",
        element:<ManageVehicle/>
      },      
      {
        path:"parking",
        element:<ParkingLot/>,     
      },      
      {
        path:"manageSlot",
        element:<ManageLot/>
      },      
      {
        path:"profile",
        element:<UserProfile/>
      },     
      {
        path:"reservation",
        element:<ReservationPage/>
      },
      {
        path:"payment",
        element:<PaymentPage/>
      }
     
    ],
  },
]);


function App() {

  // Access login state from Redux
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
   <RouterProvider router={router} isUserLogged={isLoggedIn}/>
  )
}

export default App
