import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../hooks/authService";
import axios, { axiosPrivate } from "../../utils/axios";

const initialState = {
  userInfo: {
    accessToken: null,
  },

  status: "idle", // idle,loading,success,fail
  error: null,
};

// To update userData into state after LOGIN
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, role) => {
    // console.log(userData,role,"checking if passed");
    const response = await authService.login(userData, role);

    console.log(response, "userslice response");
    return response;
  }
);

// To GET a USER data
export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ post, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`users/${post?.owner?._id}`);
      console.log(response, "fetching user data in redux");
    } catch (err) {
      return rejectWithValue("error", err);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      // state.userInfo.accessToken = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          accessToken: action.payload,
        },
      };
    },
    updateFollow: (state, action) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          following: [...state.userInfo.following, action.payload],
        },
      };
    },
    updateUnfollow: (state, action) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          following: state.userInfo.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload.result;
        // state.userInfo.accessToken = action.payload.accessToken;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = state.userInfo;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const selectAllUsers = (state) => state.user.userInfo;
export const selectAllStatus = (state) => state.user.status;
export const selectAllError = (state) => state.user.error;
export const selectUserState = (state) => state.user;

export const { updateAccessToken, updateFollow, updateUnfollow, logOut } =
  userSlice.actions;

export default userSlice.reducer;
