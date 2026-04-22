import React from 'react'
import bollrads from '../assets/bollrads.jpg'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
   const navigate = useNavigate();

   const handelHome= ( e) => {
      e.preventDefault();
       navigate("/home");
   }

   const handelContact= ( e) => {
      e.preventDefault();
       navigate("contact");
   }

  return (

   

    <>
      <footer className="bg-orange-200 py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img src={logo} alt="logo" className="h-10 w-40 object-contain" />         
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          <button onClick={handelHome} className="hover:text-orange-600">Home</button>
          <button onClick={handelContact} className="hover:text-orange-600">Contact</button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-4">
        © {new Date().getFullYear()} Sure Park. All rights reserved.
      </div>
    </footer>
    </>
    
  )
}

export default Footer