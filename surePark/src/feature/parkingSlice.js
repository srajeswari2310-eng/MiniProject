// feature/parkingSlice.js
import { createSlice } from "@reduxjs/toolkit";
import parkings from "../models/parking";

// Utility to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Utility to format time as HH:MM (24h)
const formatTime = (date) => date.toTimeString().slice(0, 5);

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
  parkings: parkings,
  selectedLocation: 1,
  selectedParking: null, // parking details of the location
  selectedPlan: "shortTerm",
  selectedVehicleNo: "",
  selectedSlot: null,
  selectedStartDate: "",
  selectedEndDate: "",
  selectedStartTime: "",
  selectedEndTime: "",
  parkingError: null,
  parkingSuccess: false,
  reservationDetails: null,
  isSuccess: false,
  isPayment:false
}

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    reserveSlot: (state, action) => {
      const { currentUser } = action.payload;

      const isBooked = currentUser.reservedSlot?.find(res => res.details.vehicleNo == state.selectedVehicleNo && res.details.startDate == state.selectedStartDate);

      if (isBooked) {
        state.parkingError = "Already Reserved in Same Date";
      } else {

        if (state.selectedSlot != null) {
           const reservD = {
                  plan: state.selectedPlan,
                  startDate: state.selectedStartDate,
                  endDate: state.selectedEndDate,
                  startTime: state.selectedStartTime,
                  endTime: state.selectedEndTime,
                  user: currentUser.Id,
                  userVehicleNo: state.selectedVehicleNo
                };
          state.reservationDetails = reservD;
          state.reserved = true;
          state.parkingError = null;      
           state.isSuccess = true;
                state.isPayment = true;    
        } else {
          state.parkingError = "Select Slot";
           state.isSuccess = false;
                state.isPayment = false;
        }             

      }
    },
    paymentConfirm:(state, action)=>{
      const { paymentMade } = action.payload;
      const { currentUser } = action.payload;

      if(paymentMade) {
        const location = state.parkings.find(l => l.locationId == state.selectedLocation);
          if (location) {
            const floor = location.floors.find(f => f.floorId == state.selectedSlot.floorId);
            if (floor) {
              const slot = floor.slots.find(s => s.id == state.selectedSlot.slotId);
              if (slot) {
                slot.reserved = true;
                const reservD = {
                  plan: state.selectedPlan,
                  startDate: state.selectedStartDate,
                  endDate: state.selectedEndDate,
                  startTime: state.selectedStartTime,
                  endTime: state.selectedEndTime,
                  user: currentUser.Id,
                  userVehicleNo: state.selectedVehicleNo
                };

                slot.reservedDetail.push(reservD);
                state.selectedParking = state.parkings.find(x => x.locationId == location);
                state.selectedSlot = null;
                state.parkingError = null;
                state.isSuccess = true;
                state.isPayment = true;
              }
            }
          }

      }

    },
    removeReservation: (state, action) => {
      const { floorId, slotId } = action.payload;
      console.log(floorId)
      console.log(slotId)
      const parkingId = state.selectedParking.locationId;
      console.log(parkingId)
      const floor = state.parkings.find(x => x.locationId == parkingId)?.floors.find(f => f.floorId === floorId);
      if (floor) {
        const slot = floor.slots.find(s => s.id === slotId);
        if (slot) {
          slot.occupied = false;
          slot.user = null;
          slot.userVehicleNo = null;
          slot.reserved = null;
          slot.reservationDetails = [];
          state.selectedParking = state.parkings.find(x => x.locationId == parkingId);
        }
      }
    },
    setIntialValues: (state, action) => {
      const { currentUser } = action.payload;
      state.selectedVehicleNo = currentUser?.vehicles?.[0]?.no || "";
      // state.selectedLocation = parkings?.[0]?.locationId || "";
      state.selectedStartDate = startDate;
      state.selectedEndDate = endDate;
      state.selectedStartTime = startTime;
      state.selectedEndTime = endTime;
      state.selectedPlan = "shortTerm";
      state.selectedSlot = null;
      state.parkingError = null;
      console.log(state.parkings)
    },
    setSelectedLocation: (state, action) => {
      const { location } = action.payload;
      state.selectedParking = state.parkings.find(x => x.locationId == location);
      state.selectedLocation = location;
    },
    setSelectedParking: (state, action) => {
      const { location } = action.payload;
      state.selectedParking = state.parkings.find(x => x.locationId == location);

    },
    setSelectedVehicleNo: (state, action) => {
      const { vehicleNo } = action.payload;
      state.selectedVehicleNo = vehicleNo;
    },
    setSelectedPlan: (state, action) => {
      const { plan } = action.payload;
      state.selectedPlan = plan;
      if (state.selectedPlan == "monthly") {
        state.selectedEndDate = endMonth;
      } else {
        state.selectedEndDate = endDate;
      }
    },
    setSelectedStartDate: (state, action) => {
      const { sDate } = action.payload;
      const newDate = new Date(sDate).setHours(0, 0, 0, 0);
      const todayDate = new Date(startDate).setHours(0, 0, 0, 0);

      if (todayDate < newDate || todayDate == newDate) {
        state.selectedStartDate = sDate;
      }
    },
    setSelectedEndDate: (state, action) => {
      const { eDate } = action.payload;

      const newDate = new Date(eDate).setHours(0, 0, 0, 0);
      const todayDate = new Date(endDate).setHours(0, 0, 0, 0);

      if (todayDate < newDate || todayDate == newDate) {
        state.selectedEndDate = eDate;
      }

    },
    setSelectedStartTime: (state, action) => {
      const { sTime } = action.payload;
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
      const { eTime } = action.payload;
      state.selectedEndTime = eTime;
    },
    setSelectedSlot: (state, action) => {
      const { floorId, slotId } = action.payload;
      state.selectedSlot = { slotId: slotId, floorId: floorId };
      console.log(state.selectedSlot);
    },
    setError: (state, action) => {
      state.parkingError = null;
    },
    reset: (state, action) => {
      const { currentUser } = action.payload;
      if(currentUser){
      state.selectedVehicleNo = currentUser?.vehicles?.[0]?.no || "";
      }
      state.selectedLocation = parkings?.[0]?.locationId || "";
      state.selectedStartDate = startDate;
      state.selectedEndDate = endDate;
      state.selectedStartTime = startTime;
      state.selectedEndTime = endTime;
      state.selectedPlan = "shortTerm";
      state.selectedSlot = null;
      state.parkingError = null;
      state.reservationDetails = null;
      state.isSuccess = false;
      state.isPayment = false;
      console.log(state.parkings);
    }

  },
});

export const { reserveSlot, removeReservation, setSelectedLocation, setSelectedParking, setIntialValues, setSelectedVehicleNo,
  setSelectedPlan, setSelectedStartDate, setSelectedEndDate, setSelectedStartTime, setSelectedEndTime, setError, setSelectedSlot,
  reset,paymentConfirm

} = parkingSlice.actions;



export default parkingSlice.reducer;
