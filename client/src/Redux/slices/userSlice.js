import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  userInfo: {
  accessToken:null
  },
  
  pending: false,
  error: false,
};

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData) => {
    const response = await axios.post("/auth/login", userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // console.log(response.data, "userslice response");
    return response.data;
  }
);





const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken:(state,action)=>{
      state.userInfo.accessToken = action.payload;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.pending = false;
        state.userInfo = action.payload.result;
        state.userInfo.accessToken = action.payload.accessToken;
        state.error = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.pending = false;
        state.error = true;
      })
      
  },
});



export const selectAllUsers = (state) => state.user.userInfo;
export const selectAllStatus = (state) => state.user.pending;
export const selectAllError = (state) => state.user.error;
export const selectUserState=(state)=>state.user

export const {updateAccessToken, logOut } = userSlice.actions;

export default userSlice.reducer;
