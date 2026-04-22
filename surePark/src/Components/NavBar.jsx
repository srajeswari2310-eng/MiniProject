import React from 'react'
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';

import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../feature/userSlice';
import { reset } from '../feature/parkingSlice';



const NavBar = ({ onScrollToAbout, onScrollToHow, onScrollToPrice }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    
    
    dispatch(logout());
    dispatch(reset({currentUser : null}));
  //  navigate('/login');
  window.location.href = "/login";
    setIsMenuOpen(false); // close menu after logout
  };

  // Check if we are on /home
  const isHomePage = location.pathname.endsWith("/home");

  // Get user info from Redux store
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const IsAdmin = () => currentUser.role == "admin";

  const navLinks = [
    { name: 'Home', to: '/home', type: 'link' },

    // Only show these when on Home
    ...(isHomePage
      ? [ 
        { name: "About", action: onScrollToAbout, type: "button" },
        ...( currentUser.role != "admin" ? [
        { name: "How It Works", action: onScrollToHow, type: "button" },
        { name: "Our Plan", action: onScrollToPrice, type: "button" },
        ] : []
        )
      ]
      : []),  

    ...(currentUser.role == "admin"

      ? [{ name: 'Manage Lot', to: 'manageSlot', type: 'link' },]
      :
      [
         { name: 'ContactUs', to: 'contact', type: 'link' },

         ...( currentUser.vehicles.length >0 ?
        [ { name: 'Find Lot', to: 'parking', type: 'link' },] : [ { name: 'Add Vehicle', to: 'vehicles', type: 'link' }]
         )
        ]
    ),

    ...(isMenuOpen && currentUser.role == "user"  ?
       [{ name: 'Profile', to: 'profile', type: 'link' },
        { name: 'Vehicles', to: 'vehicles', type: 'link' },
      { name: "Logout", action: handleLogout, type: "button" },]
       :[]),

       ...(isMenuOpen && currentUser.role == "admin"  ?
       [{ name: "Logout", action: handleLogout, type: "button" },]
       :[]),

  ];

  return (
    <nav className="text-black p-4 bg-orange-200 top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black text-2xl font-bold">
          <img src={logo} alt="logo" className="h-10 w-40 object-contain" />
        </Link>

        <div className='flex' >
          {/* Desktop Links */}
          <div className="hidden md:flex lg:me-10 space-x-4">
            {navLinks.map((link, idx) =>
              link.type === 'link' ? (
                <Link
                  key={idx}
                  to={link.to}
                  className="shadow-xl p-2 bg-orange-100 rounded-2xl hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={link.action}
                  className="shadow-xl p-2 bg-orange-100 rounded-2xl hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  {link.name}
                </button>
              )
            )}
          </div>


          {/* User Info with Dropdown */}
          {currentUser?.name && (
            <div className="hidden md:flex items-center gap-2 mr-4 relative group">
              <FaUserCircle className="text-orange-600 text-2xl cursor-pointer" />
              <span className="font-semibold cursor-pointer">{currentUser.name}</span>

              {/* Dropdown Menu */}
              <div
                className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 
                 transform scale-95 group-hover:scale-100 transition-all duration-200 ease-in-out z-50"
              >
                <ul className="flex flex-col text-gray-700 space-y-2">
                  {
                    currentUser.role != "admin" &&
                    (<>
                      <li>
                        <Link
                          to="profile"
                          className="px-14 py-2 hover:bg-orange-100 rounded-b-lg w-full"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="vehicles"
                          className="px-14 py-2 hover:bg-orange-100 rounded-b-lg w-full"
                        >
                          Vehicles
                        </Link>
                      </li>  </>)}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2  hover:bg-orange-100 rounded-b-lg w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none me-5"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>


      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden mt-4 flex flex-col gap-2 w-[80%]
      transition-all duration-300 ease-in-out 
      transform ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          {navLinks.map((link, idx) =>
            link.type === 'link' ? (
              <Link
                key={idx}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="shadow-xl p-2 bg-orange-100 rounded-2xl hover:bg-orange-500 hover:text-white text-center"
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  link.action();
                  setIsMenuOpen(false);
                }}
                className="shadow-xl p-2 bg-orange-100 rounded-2xl hover:bg-orange-500 hover:text-white"
              >
                {link.name}
              </button>
            )
          )}
        </div>
      )}

    </nav>
  );
}

export default NavBar