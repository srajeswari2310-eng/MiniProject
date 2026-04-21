import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import ParkingLotCard from "../Components/ParkingLotCard"; // reuse your card component
import { useState } from 'react';
import { removeReservation } from '../feature/parkingSlice';

const ManageLotList = () => {

  const dispatch = useDispatch();

  const { selectedParking } = useSelector((state) => state.parking);
  const { currentUser } = useSelector((state) => state.user)

  // Track which tab is active: floors or favorites
  const [activeTab, setActiveTab] = useState("floor"); // "floor" or "favorites"

  // Track which floor tab is active
  const [activeFloor, setActiveFloor] = useState(0);

  if (!selectedParking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No parking data available</p>
      </div>
    );
  }

  const floors = selectedParking.floors; // assuming one location for now

  const handelAdminSelectSlot= (data) => {
    console.log(data)
    if(data.slot.occupied || data.slot.reserved){
    dispatch(removeReservation({floorId: data.floorid, slotId: data.slot.id}))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">{selectedParking.location} Slots</h1>



     {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {floors.map((floor, index) => (
          <button
            key={floor.floorId}
            onClick={() => {
              setActiveTab("floor");
              setActiveFloor(index);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition 
              ${activeTab === "floor" && activeFloor === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {floor.name}
          </button>
        ))}
      </div>

    

 {/* Slot Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {activeTab === "floor" &&
          floors[activeFloor].slots.map((slot) => (
            <ParkingLotCard
             key={slot.id}
            floorId={floors[activeFloor].floorId}
            slotDetails={slot}
            currentUser={currentUser}
            userVehicleNo={slot.userVehicleNo}
            onSelectSlot={handelAdminSelectSlot}
            />
          ))}

        {/* {activeTab === "favorites" &&
          currentUser.favoriteSlot.map((fav, index) => {
            // Find the correct location
            const mall = parkings.find((p) => p.location === fav.location);
            if (!mall) return null;

            // Find the floor
            const floor = mall.floors.find((f) => f.floorId === fav.floorId);
            if (!floor) return null;

            // Find the slot
            const slot = floor.slots.find((s) => s.id === fav.slotsId);
            if (!slot) return null;

            return (
              <ParkingLotCard
                key={`${fav.location}-${fav.floorId}-${fav.slotsId}-${index}`}
                floorId={floor.floorId}
                slotDetails={slot}
                user={slot.user}
                userVehicleNo={slot.userVehicleNo}
                onSelectSlot={handelSelectSlot}
              />
            );
          })} */}
      </div>

    </div>
  );
  
}


export default ManageLotList