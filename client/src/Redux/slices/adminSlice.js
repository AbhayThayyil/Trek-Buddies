import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      

  },
});

export const adminGetAllUsers = (state) => state.admin.users;
export const adminGetAllPosts=(state)=>state.admin.posts

export default adminSlice.reducer;
