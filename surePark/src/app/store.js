import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../feature/userSlice'
import parkingReducer from '../feature/parkingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    parking: parkingReducer
  },
});

