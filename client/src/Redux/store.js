import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import adminSlice from "./slices/adminSlice";



export default configureStore({
  reducer: {
    user:userSlice,
    post:postSlice,
    admin:adminSlice
    
  },
});


