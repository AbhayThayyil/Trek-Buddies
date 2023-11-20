import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import authService from "../../hooks/authService";

const initialState = {
  userInfo: {},

  allUsers: [],
  friendsData: [],
  persist: JSON.parse(localStorage.getItem("persist")) || false,

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

// To LOGOUT
export const userLogout = createAsyncThunk(
  "users/userLogout",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/auth/logout");
      console.log(response.data, "response after logout");
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//Follow
export const followUser = createAsyncThunk(
  "users/followUser",
  async ({ axiosPrivate, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/users/${userId}/follow`);
      console.log(response.data, "follow response");
      return response.data.followedUserId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//Unfollow
export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({ axiosPrivate, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/users/${userId}/unfollow`);
      console.log(response.data, "unfollow response");
      return response.data.unfollowedUserId;
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
    },

    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    setPersist: (state, action) => {
      state.persist = action.payload;
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
      })
      .addCase(userLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = {};
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(followUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo.following.push(action.payload);

        const followedUser = state.allUsers.find(
          (user) => user._id === action.payload
        );
        if (followedUser) {
          followedUser.followers.push(state.userInfo._id);
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo.following = state.userInfo.following.filter(
          (elem) => elem !== action.payload
        );
        const unfollowedUser = state.allUsers.find(
          (user) => user._id === action.payload
        );
        if (unfollowedUser) {
          unfollowedUser.followers = unfollowedUser.followers.filter(
            (elem) => elem !== state.userInfo._id
          );
        }
      })
      .addCase(unfollowUser.rejected, (state, action) => {
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
export const selectPersistState = (state) => state.user.persist;

export const {
  updateAccessToken,

  logOut,
  setPersist,
} = userSlice.actions;

export default userSlice.reducer;
