import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import authService from "../../hooks/authService";
import axios, { axiosPrivate } from "../../utils/axios";

const initialState = {
  userInfo: {
    accessToken: null,
  },
  allUsers: [],
  friendsData: [],

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

// To GET UserInfo of all users
export const getAllUsersInfo = createAsyncThunk(
  "users/getAllUsersInfo",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/users");
      // console.log(response.data,"get all users info");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To GET a USER data
export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ post, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/users/${post?.owner?._id}`);
      // console.log(response, "fetching user data in redux");
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To GET a USERINFO

export const userInfoFromId = createAsyncThunk(
  "users/userInfoFromId",
  async ({ userId, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/users/${userId}`);
      // console.log(response.data, "fetch a single user info ");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To UPDATE Profile Picture of User

export const updateProfilePicture = createAsyncThunk(
  "users/updateProfilePicture",
  async ({ data, axiosPrivate, config }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(
        "/users/updateProfilePicture",
        data,
        config
      );
      // console.log(response.data, "response to upload profile pic chk");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To UPDATE Cover Picture of User

export const updateCoverPicture = createAsyncThunk(
  "users/updateCoverPicture",
  async ({ data, axiosPrivate, config }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(
        "/users/updateCoverPicture",
        data,
        config
      );
      // console.log(response.data, "response to upload Cover pic chk");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To GET a USER's FRIEND (following) data

export const getAllFriendsData = createAsyncThunk(
  "users/getAllFriendsData",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/users/friends/all");
      // console.log(response.data, "response for friends list");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
     
      state.userInfo.accessToken = action.payload;
      
      // return {
      //   ...state,
      //   userInfo: {
      //     ...state.userInfo,
      //     accessToken: action.payload,
      //   },
      // };
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
      .addCase(updateProfilePicture.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload;
        // state.userInfo.accessToken = action.payload.accessToken;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
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
      })
      .addCase(userInfoFromId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userInfoFromId.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = state.userInfo;
      })
      .addCase(userInfoFromId.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(getAllUsersInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUsersInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.allUsers = action.payload;
      })
      .addCase(getAllUsersInfo.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(getAllFriendsData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllFriendsData.fulfilled, (state, action) => {
        state.status = "success";
        state.friendsData = action.payload;
      })
      .addCase(getAllFriendsData.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const selectAllUsers = (state) => state.user.userInfo;
export const selectAllStatus = (state) => state.user.status;
export const selectAllError = (state) => state.user.error;
export const selectUserState = (state) => state.user;
export const getAllUsersData = (state) => state.user.allUsers;
export const getFriendsDetails = (state) => state.user.friendsData;

export const { updateAccessToken, updateFollow, updateUnfollow, logOut } =
  userSlice.actions;

export default userSlice.reducer;
