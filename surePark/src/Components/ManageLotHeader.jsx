import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { setSelectedLocation } from '../feature/parkingSlice';

const ManageLotHeader = () => {

  const [counts, setCount] = useState(null);
  const dispatch = useDispatch();

  const { parkings, selectedLocation,selectedParking } = useSelector((state) => state.parking);

  // set selecting location
    const handleLocation = (e) => {
     e.preventDefault(); 
     console.log(e.target.value);
      dispatch(setSelectedLocation({location: e.target.value}));
    }

    useEffect(() => {
         
        
        dispatch(setSelectedLocation({location: 1}));
  
    }, []);

 useEffect(() => {
  if (selectedParking) {
    let total = 0, occupied = 0, floors = 0;

    const floorDetails = selectedParking.floors.map(floor => {
      floors++;
      let floorTotal = floor.slots.length;
      let floorOccupied = floor.slots.filter(slot => slot.occupied).length;

      total += floorTotal;
      occupied += floorOccupied;

      return {
        floorId: floor.floorId,
        name: floor.name,
        total: floorTotal,
        occupied: floorOccupied,
        available: floorTotal - floorOccupied,
      };
    });


const result = {
      total,
      occupied,
      available: total - occupied,
      floors,
      floorDetails, // array of per-floor summaries
    }
    console.log(result);

    setCount({
      total,
      occupied,
      available: total - occupied,
      floors,
      floorDetails, // array of per-floor summaries
    });
  }
}, [selectedParking]);



  return (

    <div className="w-full md:w-[80%] bg-orange-100 rounded-2xl mx-auto px-4 py-2 mt-4 mb-3 flex flex-col items-center">
       {/* Heading */}
       
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r p-2 from-teal-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Manage Parking Details
          </h2>


    <div className="w-full md:w-[80%] bg-orange-100 rounded-2xl mx-auto mt-4 mb-3 flex flex-col items-center">

       {/* Location Selection */}
        <div className="mb-2  flex ">
          <h3 className="text-2xl font-semibold text-nowrap me-4">Select Location</h3>
          <select
            value={selectedLocation}
            onChange={(e) => handleLocation(e)}
            className="border p-2 rounded w-full"
          >
            {parkings.map((parking,i) => (
                <option key={i} value={parking.locationId}>{parking.location}</option>

            ))}           
          </select>
        </div>

     

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-[100%] bg-orange-100 rounded-2xl p-2">

      {/* Card 1 */}
      <div className="h-full min-w-40 bg-white text-center flex flex-col justify-center rounded-lg shadow">
        <h3>Total Available</h3>
        <p className="text-2xl text-green-500">{counts?.available}</p>
        <p>of {counts?.total}</p>
      </div>

      {
        counts?.floorDetails.map((f,index)=>(       
        <div key={index}
         className="h-full min-w-40 bg-white text-center flex flex-col justify-center rounded-lg shadow">
        <h3>{f.name}</h3>
        <p className="text-2xl text-green-500">{f?.available}</p>
        <p>of {f?.total}</p>
      </div>

         ) )
      }
      </div>

      
    </div>
    </div>
  )
}

export default ManageLotHeader