// feature/parkingSlice.js
import { createSlice } from "@reduxjs/toolkit";
import parkings from "../models/parking";

// const initialState = {
//   parking: [
//     {
//       location: "Chennai Mall 1",
//       floors: Array.from({ length: 3 }, (_, floorIndex) => ({
//         floorId: floorIndex + 1,
//         name: `Floor ${floorIndex + 1}`,
//         slots: Array.from({ length: 15 }, (_, slotIndex) => ({
//           id: slotIndex + 1,
//           slotName: `Slot ${slotIndex + 1}`,
//           occupied: false,
//           user: null,
//         })),
//       })),
//     },
//   ],
// };

const initialState = {
  parkings : parkings,
  selectedSlot: null,
  selectedParking:null,
  selectedLocation: 1,
  selectPlan:null,
  setVehicleNo:null
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
    setSelectedLocation: (state, action) => {
      const {location} = action.payload;
      
      state.selectedParking = state.parkings.find(x=>x.locationId == location);


      state.selectedLocation = location;
    },
    setSelectedParking: (state, action) => {
      const {location} = action.payload;
      console.log(location);
      
      state.selectedParking = state.parkings.find(x=>x.locationId == location);

    },
    setVehicleNo: (state, action) => {
      state.selectPlan = action.payload;
    },
    setPlan: (state, action) => {
      state.setVehicleNo = action.payload;
    },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    }
  },
});

export const { reserveSlot, removeReservation,setSelectedLocation,setSelectedParking } = parkingSlice.actions;



export default parkingSlice.reducer;
