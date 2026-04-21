import React from 'react'
import ParkingLotHeader from '../Components/ParkingLotHeader'
import ParkingLotList from '../Components/ParkingLotList'
import SlotSearchHeader from '../Components/SlotSearchHeader'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ParkingLot = () => {
  const navigate = useNavigate();
  const { reservationDetails } = useSelector((state) => state.parking);

  const handelPayment = () => {
    console.log(reservationDetails);

      navigate("/home/payment");
    
  }

  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <SlotSearchHeader onReserve={handelPayment}/>
        <ParkingLotList/>
        </div>
  )
}

export default ParkingLot