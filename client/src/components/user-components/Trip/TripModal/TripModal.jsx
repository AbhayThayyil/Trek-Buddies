import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DateField, DatePicker } from "@mui/x-date-pickers";
import Select from "react-select"; // react select
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {
  getAllFriendsData,
  getFriendsDetails,
  selectAllUsers,
} from "../../../../Redux/slices/userSlice";
import { createTrip, getTrips } from "../../../../Redux/slices/tripSlice";

const TripModal = ({ open, handleClose, handleConfirm }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const user=useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(getAllFriendsData({ axiosPrivate }));
  }, []);

  const friendsData = useSelector(getFriendsDetails);
  console.log(friendsData, "friendsData chk");

  const options = friendsData.map((friend) => ({
    label: `${friend.firstName} ${friend.lastName}`,
    value: friend._id,
  }));

  console.log(options, "option check");

  const [tripData, setTripData] = useState({
    tripName: "",
    tripDate: "",
    tripLocation: "",
    tripMates: [],
  });

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleDate = (date) => {
    console.log(new Date(date), "date chk");
    const selectedDate = new Date(date);
    setTripData({ ...tripData, tripDate: selectedDate });
  };

  //selected options will be available as arguments
  const handleSelection = (selectedOptions) => {
    setTripData({
      ...tripData,
      tripMates: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = () => {
    dispatch(createTrip({ axiosPrivate, data: tripData })).then(()=>{
      dispatch(getTrips({axiosPrivate}))
    });
    handleConfirm();
  };

  console.log(tripData, "TripData chk");

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create a Trip</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            Fill up the details of the Trip
          </DialogContentText>
          <Stack gap={5}>
            <TextField
              name="tripName"
              placeholder="Enter the Trip Name"
              required
              onChange={handleChange}
            />
            <DateField
              // name="tripDate"
              required
              label="Trip Date"
              onChange={handleDate}
            />
            <TextField
              name="tripLocation"
              placeholder="Enter the location you want to tour"
              onChange={handleChange}
            />

            <Select
              isMulti
              placeholder="Select trip mates"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelection}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSubmit} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TripModal;
