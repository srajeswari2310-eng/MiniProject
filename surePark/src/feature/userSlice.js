import { createSlice } from "@reduxjs/toolkit";
import users from "../models/users";

const initialState = {
    users: users,
    success: false,
    isLoggedIn: false,
    currentUser: null,
    error: null,
    //for forgot pwd
    generatedOtp: "",
    otp: "",
    step: "forgot", // "forgot" | "confirm" | "change"
    userChange:null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            const exists = state.users.find((u) => u.email === email);

            if (exists) {
                if (exists.password === password) {
                    state.currentUser = exists;
                    state.error = null;
                    state.isLoggedIn = true;
                }
                else {
                    state.error = "Invalid Crentials";
                    state.isLoggedIn = false;
                }
            }
            else {
                state.error = "User doesnt exist";
                state.isLoggedIn = false;
            }

        },
        register: (state, action) => {
            const { name, email, password } = action.payload;
            const exists = state.users.find((u) => u.email === email);
            if (exists) {
                state.error = "User already exists";
                state.success = false;
            } else {
                const newUser = { name, email, password, isLoggedIn: false,vehicles:[], favoriteSlot:[], reservedSlot:[], role:"user"};
                state.users.push(newUser);
                state.error = null;
                state.success = true;
            }
        },
        changePassword: (state, action) => {
            
            const {password} = action.payload;
        console.log(password);
           const exists = state.users.find((u) => u.email === state.userChange.email);
           if(exists) {
            state.users.find((u) => u.email === state.userChange.email).password = password;
            state.error = null;
            state.userChange= null;
            state.success = true;
            state.step='forgot';
           }
        },
        generateOtp: (state, action) => {
            const { email } = action.payload;

            const exists = state.users.find((u) => u.email == email);
            console.log(email);

            if (exists) {
                const min = 10000000;
                const max = 99999999;
                const otpValue = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
                state.generatedOtp = otpValue;
                state.userChange = exists;
                state.step = "confirm";
                state.error = null;
            } else {
                state.error = "User does not exist.";
            }
        },
        confirmOtp: (state, action) => {
            const {otp} = action.payload;

            if(otp == state.generatedOtp)
            {
                state.error = null;
                state.step = "change";              

            }
            else
            {
                state.error = "InValid Otp"                
            }
        } ,
        setForgotState:(state) => {
            state.error = null;
            state.step ='forgot';
            state.otp = "";
            state.generatedOtp ="";
            state.userChange = null;
            state.success = false;
        },
        logout:(state, action)=> {
             state.error = null;
            state.step ='forgot';
            state.otp = "";
            state.generatedOtp ="";
            state.userChange = null;
            state.success = false;
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        addUserVehicles:(state,action) => {
            const { vehicleNo } = action.payload;
            console.log(vehicleNo);

            const isVehicleExists = state.currentUser.vehicles.find(x=> x.no == vehicleNo);
            if(!isVehicleExists){
                 state.users.find((u) => u.email === state.currentUser.email).vehicles.push({
                    no: vehicleNo
                 });
                 state.currentUser.vehicles.push({
                    no: vehicleNo
                 })
                 state.error = null;

            }else{
                state.error = "VehicleNo exist";
            }

        },
        editUserVehicles:(state,action) => {
            const { vehicleNo, index } = action.payload;

            const isVehicleExists = state.currentUser.vehicles.find(x=> x.no == vehicleNo);
            if(!isVehicleExists){
                 state.users.find((u) => u.email === state.currentUser.email).vehicles[index].no = vehicleNo;
                 state.currentUser.vehicles[index].no = vehicleNo;
                 state.error = null;

            }else{
                state.error = "VehicleNo exist";
            }
        },
        deleteUserVehicles:(state,action)=> {
            const {index} = action.payload;
            const updated = state.currentUser.vehicles.filter((_, i) => i !== index);
            state.users.find((u) => u.email === state.currentUser.email).vehicles = updated;
            state.currentUser.vehicles = updated;
        },
        handleFav:(state,action) => {
            const {slotId , floorId, locationId } = action.payload;

            const exists = state.users.find((u) => u.email === state.currentUser.email);
            if(exists) {
                var fav =   state.currentUser?.favoriteSlot?.find(x=> x.locationId == locationId && x.floorId == floorId && slotId == x.slotId );
                if(fav)
                {
                    const updated = state.currentUser.favoriteSlot?.filter( i => i != fav);
                    state.users.find((u) => u.email === state.currentUser.email).favoriteSlot = updated;
                    state.currentUser.favoriteSlot = updated;
                }
                else{
                    const fav = {
                        locationId: locationId,
                       floorId: floorId,
                       slotId: slotId
                        
                    }
                    state.users.find((u) => u.email === state.currentUser.email).favoriteSlot.push(fav);
                    state.currentUser.favoriteSlot.push(fav);
                }
            }
            
        },
        insertReservation:(state,action) =>{
            const { details } =action.payload

              const exists = state.users.find((u) => u.email === state.currentUser.email);
              console.log(exists)
            if(exists) {
                state.users.find((u) => u.email === state.currentUser.email).reservedSlot.push(details);
                state.currentUser?.reservedSlot.push({
                    details
                })              
            }

        },
        resetUserError:(state,action) => {
            state.error = null;
        }

    }
});

export const { register, login, changePassword, generateOtp, confirmOtp, setForgotState, logout, 
    addUserVehicles, editUserVehicles, deleteUserVehicles, handleFav,insertReservation,resetUserError
 } = userSlice.actions;
export default userSlice.reducer;

