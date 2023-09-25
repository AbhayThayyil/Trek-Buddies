import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle", // idle,loading,success,fail
  error: null,
};

// To GET all POSTS of a USER
export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async ({ userId, axiosPrivate }, { rejectWithValue }) => {
    // console.log(userId, "id check");
    try {
      const response = userId
        ? await axiosPrivate.get(`/posts/profile/${userId}`)
        : await axiosPrivate.get(`/posts/timeline/all`);

      // console.log(response.data, "what is response in fetchposts");
      // response.data.sort((p1, p2) => {
      //   return new Date(p2.createdAt) - new Date(p1.createdAt);
      // });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//To CREATE a POST

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ data, axiosPrivate, config }, { rejectWithValue }) => {
    // console.log(data,"data chk");
    try {
      const response = await axiosPrivate.post("/posts", data, config);
      // console.log(response.data, "what if i posted here");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To UPDATE a POST
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ data, axiosPrivate, config, postId }, { rejectWithValue }) => {
    console.log(data, "data chk for update");
    try {
      const response = await axiosPrivate.put(`/posts/${postId}`, data, config);
      console.log(response.data, "what if i posted here");
      return response.data.updatedPost;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//To DELETE a POST

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ axiosPrivate, postId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`/posts/${postId}`);
      console.log(response.data, "delete post response");
      return { postId };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To REPORT a POST

export const reportPost = createAsyncThunk(
  "post/reportPost",
  async ({ axiosPrivate, reportReasonText, postId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/posts/${postId}/report`, {
        reportReasonText,
      });

      console.log(response, "resp");
      response.data.postId = postId;
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To CREATE a COMMENT

export const createComment = createAsyncThunk(
  "post/createComment",
  async ({ commentText, post, axiosPrivate }, { rejectWithValue }) => {
    try {
      console.log(commentText, "comment check for axios");
      const response = await axiosPrivate.put(`/posts/${post._id}/comment`, {
        comment: commentText,
      });
      // console.log(response.data.comment, "what is response of comment post");
      response.data.postId = post?._id;
      console.log(response.data, "what is response of comment post");
      return response.data;
      //todo to return
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// to EDIT a COMMENT

export const editComment = createAsyncThunk(
  "post/editComment",
  async (
    { axiosPrivate, editedCommentText, commentId, postId },
    { rejectWithValue }
  ) => {
    try {
      // console.log(commentId, postId,  "id checks");
      console.log(editedCommentText, "edited comment chk");
      const response = await axiosPrivate.patch(
        `/posts/${postId}/editComment/${commentId}`,
        { comment: editedCommentText }
      );
      response.data.postId = postId;
      response.data.commentId = commentId;
      console.log(response.data, "response after comment edit check");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// to DELETE a COMMENT

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async ({ axiosPrivate, commentId, postId }, { rejectWithValue }) => {
    try {
      console.log(commentId, postId, "id checks");
      const response = await axiosPrivate.put(
        `/posts/${postId}/deleteComment/${commentId}`
      );
      // console.log(response.data, "response after comment delete check");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// to LIKE / UNLIKE a POST

export const handleLike = createAsyncThunk(
  "post/handleLike",
  async ({ post, user, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/posts/${post?._id}/like`, {
        owner: user._id,
      });
      console.log(response.data, "response check after liking/disliking");
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "success";
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "success";

        const { _id } = action.payload;

        const postIndex = state.posts.findIndex((post) => post._id === _id);
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "success";

        const { postId } = action.payload;

        state.posts = state.posts.filter((post) => post._id !== postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(reportPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        state.status = "success";
        const { postId, report } = action.payload;
        const postIndex = state.posts.findIndex((post) => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].reports.push(report);
        }
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(createComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        console.log(action.payload, "payload to comment");
        state.status = "success";
        const { postId, comment } = action.payload;

        const postIndex = state.posts.findIndex((post) => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments.push(comment);
          console.log(state.posts[postIndex].comments);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(editComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, action) => {
        console.log(action.payload, "payload to edit comment");
        state.status = "success";
        const { postId, commentId, comment } = action.payload;

        const postIndex = state.posts.findIndex((post) => post._id === postId);
        if (postIndex !== -1) {
          const uniqueComment = state.posts[postIndex].comments.find(
            (singleComment) => singleComment._id === commentId
          );
          console.log(current(uniqueComment), "comment found");
          uniqueComment.comment = comment.comment;
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "success";

        const { postId, commentId } = action.payload;

        const post = state.posts.find((post) => post._id === postId);
        // console.log(current(post),"post");
        if (post) {
          post.comments = post.comments.filter(
            (comment) => comment._id !== commentId
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(handleLike.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(handleLike.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(handleLike.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const getAllPosts = (state) => state.post.posts;

export const getCommentsOfPost = (state) => state.post.posts[0].comments;

export default postSlice.reducer;
