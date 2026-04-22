import React from 'react'
import {Outlet} from 'react-router-dom'

import NavBar from '../Components/NavBar'
import { useSelector } from 'react-redux';
import LoginPage from '../Pages/LoginPage';
import Footer from '../Components/Footer';
import { useRef } from 'react';


function DashBoardLayout(){

    const { isLoggedIn,currentUser } = useSelector((state) => state.user);

     const aboutRef = useRef(null);
     const howRef = useRef(null);
     const priceRef = useRef(null);
     const role = currentUser?.role;

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHow = () => {
    howRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrice = () => {
    priceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  if (!isLoggedIn) {
    // If not logged in, show login-related routes
    return <LoginPage />;
  }

  // If logged in, show Navbar and protected children
  return (
    <>
      <NavBar onScrollToAbout={scrollToAbout} onScrollToHow={scrollToHow} onScrollToPrice={scrollToPrice}/>
      <Outlet context={{ aboutRef, howRef, priceRef, role }}/>
      <Footer/>
    </>
  );
}

export default DashBoardLayout