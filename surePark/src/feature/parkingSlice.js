// feature/parkingSlice.js
import { createSlice } from "@reduxjs/toolkit";
import parkings from "../models/parking";

// Utility to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Utility to format time as HH:MM (24h)
const formatTime = (date) => date.toTimeString().slice(0,5);

// Current date/time
const now = new Date();

// Start date = today
const startDate = formatDate(now);

// End date = tomorrow
const tomorrow = new Date();
tomorrow.setDate(now.getDate() + 1);
const endDate = formatDate(tomorrow);

// End date = +1 month
const oneMonthLater = new Date(now);
oneMonthLater.setMonth(now.getMonth() + 1);
const endMonth = formatDate(oneMonthLater); // format as YYYY-MM-DD

// Start time = current time
const startTime = formatTime(now);

// End time = +1 hour
const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
const endTime = formatTime(oneHourLater);


const initialState = {
  parkings : parkings,    
  selectedLocation: 1,
  selectedParking:null, // parking details of the location
  selectedPlan:"shortTerm",
  selectedVehicleNo:"",
  selectedSlot: null,
  selectedStartDate:"",
  selectedEndDate:"",
  selectedStartTime:"",
  selectedEndTime:"",
  parkingError: null,
  parkingSuccess: false
}

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    reserveSlot: (state, action) => {
      const { floorId, slotId, user } = action.payload;
      const floor = state.parkings[0].floors.find(f => f.floorId === floorId);
      if (floor) {
        const slot = floor.slots.find(s => s.id === slotId);
        if (slot && !slot.occupied) {
          slot.occupied = true;
          slot.user = user;
        }
      }
    },
    removeReservation: (state, action) => {
      const { floorId, slotId } = action.payload;
      console.log(floorId)
      console.log(slotId)
      const floor = state.parkings[0].floors.find(f => f.floorId === floorId);
      if (floor) {
        const slot = floor.slots.find(s => s.id === slotId);
        if (slot) {
          slot.occupied = false;
          slot.user = null;
          slot.userVehicleNo = null;
        }
      }
    },
    setIntialValues:(state,action)=>{
      const {currentUser} = action.payload;
      state.selectedVehicleNo = currentUser?.vehicles?.[0]?.no || "";
     // state.selectedLocation = parkings?.[0]?.locationId || "";
      state.selectedStartDate = startDate;
      state.selectedEndDate = endDate;     
      state.selectedStartTime = startTime;
      state.selectedEndTime = endTime;
      state.selectedPlan = "shortTerm";
      state.selectedSlot = null;
      console.log(state.parkings)
    },
    setSelectedLocation: (state, action) => {
      const {location} = action.payload;      
      state.selectedParking = state.parkings.find(x=>x.locationId == location);
      state.selectedLocation = location;
    },
    setSelectedParking: (state, action) => {
      const {location} = action.payload;      
      state.selectedParking = state.parkings.find(x=>x.locationId == location);

    },
    setSelectedVehicleNo: (state, action) => {
      const {vehicleNo} = action.payload;      
      state.selectedVehicleNo = vehicleNo;
    },
    setSelectedPlan: (state, action) => {
     const {plan} = action.payload;      
      state.selectedPlan = plan;
      if(state.selectedPlan == "monthly"){
        state.selectedEndDate = endMonth;
      } else {
        state.selectedEndDate = endDate;
      }
    },
    setSelectedStartDate: (state, action) => {
     const { sDate} = action.payload;      
     const newDate = new Date(sDate).setHours(0,0,0,0);
     const todayDate = new Date(startDate).setHours(0,0,0,0);
      
     if(todayDate < newDate || todayDate == newDate) {
      state.selectedStartDate = sDate;
     }
    },
    setSelectedEndDate: (state, action) => {
     const {eDate} = action.payload;   
     
      const newDate = new Date(eDate).setHours(0,0,0,0);
     const todayDate = new Date(endDate).setHours(0,0,0,0);
      
     if(todayDate < newDate || todayDate == newDate) {
      state.selectedEndDate = eDate;
     }
      
    },
    setSelectedStartTime: (state, action) => {
     const {sTime} = action.payload;   
     console.log(sTime)   
    state.selectedStartTime = sTime;

    // Parse "HH:MM" string into a Date object
    const [hours, minutes] = sTime.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    // Add 1 hour
    const oneHourLater = new Date(baseDate.getTime() + 60 * 60 * 1000);

    // Format back to "HH:MM"
    const formatTime = (date) => date.toTimeString().slice(0, 5);
    state.selectedEndTime = formatTime(oneHourLater);
    
    },
    setSelectedEndTime: (state, action) => {
     const {eTime} = action.payload;      
      state.selectedEndTime = eTime;
    },
    setSelectedSlot: (state, action) => {
       const {floorId,slotId} = action.payload;      
      state.selectedSlot = {slotId: slotId, floorId: floorId};
      console.log(state.selectedSlot);
    },
    setError:(state, actiob) => {
      state.parkingError = null;
    }
  },
});

export const { reserveSlot, removeReservation,setSelectedLocation,setSelectedParking,setIntialValues,setSelectedVehicleNo,
  setSelectedPlan, setSelectedStartDate , setSelectedEndDate, setSelectedStartTime, setSelectedEndTime, setError,setSelectedSlot

 } = parkingSlice.actions;



export default parkingSlice.reducer;
