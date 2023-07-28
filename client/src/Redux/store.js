import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Redux/slices/userSlice'

export default configureStore({
  reducer: {
    user:userReducer
  },
});


