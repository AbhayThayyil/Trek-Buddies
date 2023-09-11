import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  posts: [],
  reports: [],
  status: "idle", // idle,loading,success,fail
  error: null,
};

// To GET the list of USERS
export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/admin/usersList");
      // console.log(response.data.users,"response for users list for admin");
      return response.data.users;
    } catch (err) {
      return rejectWithValue("error", err);
    }
  }
);

// To GET the list of POSTS
export const getPosts = createAsyncThunk(
  "admin/getPosts",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/admin/postsList");
      // console.log(response,"response for post list for admin");
      return response.data.posts;
    } catch (err) {
      return rejectWithValue("error", err);
    }
  }
);

// To GET a list of REPORTS

export const getReports = createAsyncThunk(
  "admin/getReports",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/admin/reportsList");
      // console.log(response.data, "reponse chk");
      return response.data.allReports
    } catch (err) {
      return rejectWithValue("error", err);
    }
  }
);

// To BLOCK/UNBLOCK a USER

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async ({ axiosPrivate, userEmail }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(
        `/admin/blockUser/${userEmail}`
      );
      // console.log(response, "response chk");
      return response.data.updatedUser;
    } catch (err) {
      return rejectWithValue("error", err);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(getReports.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.status = "success";
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(blockUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.status = "success";
        const { email } = action.payload;
        let userIndex = state.users.findIndex((user) => user.email === email);
        state.users[userIndex] = action.payload;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const adminGetAllUsers = (state) => state.admin.users;
export const adminGetAllPosts = (state) => state.admin.posts;
export const adminGetAllReports=(state)=>state.admin.reports

export default adminSlice.reducer;
