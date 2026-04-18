import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLocation, setSelectedParking } from '../feature/parkingSlice';

const SlotSearchHeader = () => {

    const [vehicleType, setVehicleType] = useState("");
  const [plan, setPlan] = useState("");
  //const [location, setLocation] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

   const {currentUser} = useSelector((state) => state.user); // Redux selector
   const {parkings, selectedLocation} = useSelector((state) => state.parking); // Redux selector

   const dispatch = useDispatch();

  const handleConfirm = () => {
    alert(`Reservation Confirmed:\nLocation: \nVehicle: ${vehicleType}\nPlan: ${plan}\nDuration: ${plan === "shortTerm" ? `${startTime} - ${endTime}` : `${startDate} to ${endDate}`}`);
  };


  const handleLocation = (e) => {
   e.preventDefault(); 
    console.log(e.target.value)
   //setLocation(e.target.value);
dispatch(setSelectedLocation({location: e.target.value}));
    

  }

  useEffect(()=>{

    dispatch(setSelectedParking({location: selectedLocation}));
  },[selectedLocation])

  

  

  
  return (
   
      <div className="w-full md:w-[80%] bg-orange-100 rounded-2xl mx-auto px-4 py-2 mt-4">
        {/* Heading
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r p-2 from-teal-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Vehicle Reservation
          </h2>
          <p className="mt-5 text-2xl text-gray-600">
            Select your vehicle, plan, and reservation time.
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row items-center gap-10 items-center justify-center">
        {/* Location Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Select Location</h3>
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

        {/* Vehicle Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Vehicle Selection</h3>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            {currentUser.vehicles.map((vehc,i) => (
                <option key={i} value={vehc.no}>{vehc.no}</option>

            ))}  
          </select>
        </div>

        {/* Plan Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Reservation Plan</h3>
            <div className="flex gap-4 overflow-x-auto">
              {['shortTerm','longTerm','monthly'].map(p => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`px-6 py-3 rounded-lg shadow ${plan === p ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} hover:scale-105 transition`}
                >
                  {p === 'shortTerm' ? 'Short-Term' : p === 'longTerm' ? 'Long-Term' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>
        </div>

       

        {/* Horizontal Selection */}
        <div className="flex flex-col lg:flex-row gap-6 mb-2 items-center justify-center" > 
        {/* Time/Date Pickers */}
        {plan === "shortTerm" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Select Time Range</h3>
             <div className="flex flex-col lg:flex-row items-center gap-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            </div>
          </div>
        )}

        {(plan === "longTerm" || plan === "monthly") && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Select Date Range</h3>
             <div className="flex flex-col lg:flex-row items-center gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded w-full  mb-4"
            />
            </div>
          </div>
        )}

         <div className="flex flex-col lg:flex-row mt-4 gap-4">
          <button
            onClick={handleConfirm}
            className="bg-orange-500 text-white text-xl px-6 py-2 rounded font-semibold shadow hover:scale-105 transform transition"
          >
            Confirm Reservation
          </button>
          <button
            onClick={() => {
              setVehicleType("");
              setPlan("");
             
              setStartTime("");
              setEndTime("");
              setStartDate("");
              setEndDate("");
            }}
            className="bg-gray-400 text-white text-xl px-6 py-2 rounded font-semibold shadow hover:scale-105 transform transition"
          >
            Cancel
          </button>
        </div>

        {/* Summary
        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Reservation Summary</h3>
          <p className="text-gray-600">Location: {location}</p>
          <p className="text-gray-600">Vehicle: {vehicleType || "Not selected"}</p>
          <p className="text-gray-600">Plan: {plan || "Not selected"}</p>
          <p className="text-gray-600">
            Duration: {plan === "shortTerm"
              ? startTime && endTime
                ? `${startTime} - ${endTime}`
                : "Not selected"
              : startDate && endDate
              ? `${startDate} to ${endDate}`
              : "Not selected"}
          </p>
        </div> */}

        {/* Actions */}
        {/* <div className="flex gap-4">
          <button
            onClick={handleConfirm}
            className="bg-orange-500 text-white text-xl px-6 py-2 rounded font-semibold shadow hover:scale-105 transform transition"
          >
            Confirm Reservation
          </button>
          <button
            onClick={() => {
              setVehicleType("");
              setPlan("");
              setLocation("Mall1");
              setStartTime("");
              setEndTime("");
              setStartDate("");
              setEndDate("");
            }}
            className="bg-gray-400 text-white text-xl px-6 py-2 rounded font-semibold shadow hover:scale-105 transform transition"
          >
            Cancel
          </button>
        </div> */}
        </div>
     
        </div>
  );
}

export default SlotSearchHeader