import React from 'react'
import ParkingLotHeader from '../Components/ParkingLotHeader'
import ParkingLotList from '../Components/ParkingLotList'
import SlotSearchHeader from '../Components/SlotSearchHeader'

const ParkingLot = () => {

  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <SlotSearchHeader/>
        <ParkingLotList/>
        </div>
  )
}

export default ParkingLot