import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { logOut } from "./userSlice";

const initialState = {
  trips: [],
  searchData: [], // for searching in trips
  status: "idle", // idle,loading,success,fail
  error: null,
};

// To CREATE a TRIP

export const createTrip = createAsyncThunk(
  "trip/createTrip",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    try {
      // console.log(data,"trip data chk");
      const response = await axiosPrivate.post("/trip", data);
      //   console.log(response.data, "trip create response ");
      return response.data.savedTrip;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To GET all TRIPs

export const getTrips = createAsyncThunk(
  "trips/getTrips",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/trip");
      //   console.log(response,"trip response");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To DROP a TRIP by CREATOR
export const dropTrip = createAsyncThunk(
  "trips/dropTrip",
  async ({ axiosPrivate, tripId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`/trip/${tripId}`);
      console.log(response, "dropped trip response");
      return response.data.tripToDelete;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To JOIN a TRIP by anyone
export const joinTrip = createAsyncThunk(
  "trips/joinTrip",
  async ({ axiosPrivate, tripId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/trip/${tripId}`);
      console.log(response.data, "join trip response");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// To LEAVE a TRIP by anyone
export const leaveTrip = createAsyncThunk(
  "trips/leaveTrip",
  async ({ axiosPrivate, tripId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/trip/leave/${tripId}`);
      console.log(response.data, "leave trip response");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    searchTrip: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.status = "success";
        state.trips.push(action.payload);
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(getTrips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.status = "success";
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(dropTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dropTrip.fulfilled, (state, action) => {
        state.status = "success";
        const { _id } = action.payload;
        state.trips = state.trips.filter((trip) => trip._id !== _id);
      })
      .addCase(dropTrip.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(joinTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinTrip.fulfilled, (state, action) => {
        state.status = "success";
        const { userId, tripId } = action.payload;

        const tripIndex = state.trips.findIndex((trip) => trip._id === tripId);

        if (tripIndex !== -1) {
          state.trips[tripIndex].tripMates.push(userId);
        }
      })
      .addCase(joinTrip.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(leaveTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(leaveTrip.fulfilled, (state, action) => {
        state.status = "success";
        const { userId, tripId } = action.payload;
        const trip = state.trips.find((trip) => trip._id === tripId);

        if (trip) {
          trip.tripMates = trip.tripMates.filter(
            (elementId) => elementId !== userId
          );
        }
      })
      .addCase(leaveTrip.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const listAllTrips = (state) => state.trip.trips;

export const {searchTrip} =tripSlice.actions

export default tripSlice.reducer;
