import React from 'react'
import { useOutletContext } from 'react-router-dom';

import Hero from '../Components/Hero';
import About from '../Components/About';
import ParkingTypes from '../Components/ParkingTypes';
import HowItWorks from '../Components/HowItWorks';
import { useState } from 'react';
import { useEffect } from 'react';
import parking from '../models/parking';
import Pricing from '../Components/Pricing';

const Home = () => {
  const parkingData = parking;

  useEffect(()=>{
    console.log(parkingData)

  },[])
  

  const { aboutRef } =  useOutletContext(); // get ref from parent
  const { howRef } =  useOutletContext(); 
  const { priceRef } =  useOutletContext(); 
  return (
  <>
  <Hero/>
  <section ref={aboutRef}>
  <About/>
  </section>
  <ParkingTypes/>
  <section ref={howRef}>
  <HowItWorks/>
  </section>
  <section ref={priceRef}>
  <Pricing/>
  </section>
  </>
  )
}

export default Home