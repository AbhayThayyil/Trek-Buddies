import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: [],
  onlineFriends: [],

  status: "idle", // idle,loading,success,fail
  error: null,
};

//To initialize socket
export const initializeSocket = createAsyncThunk(
  "chat/initializeSocket",
  async () => {
    const socket = io("http://localhost:5000");
    return socket;
  }
);

// To get all online users

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setOnlineFriends: (state, action) => {
      state.onlineFriends = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeSocket.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(initializeSocket.fulfilled, (state, action) => {
        state.status = "success";
        state.socket = action.payload;
      })
      .addCase(initializeSocket.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const selectOnlineUsers = (state) => state.chat.onlineUsers;
export const selectOnlineFriends = (state) => state.chat.onlineFriends;
export const selectSocket = (state) => state.chat.socket;

export const { setOnlineUsers, setOnlineFriends } = chatSlice.actions;

export default chatSlice.reducer;
