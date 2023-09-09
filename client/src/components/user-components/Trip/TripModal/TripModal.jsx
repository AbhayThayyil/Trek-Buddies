import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";
import { DateField, DatePicker } from "@mui/x-date-pickers";

const TripModal = ({ open, handleClose, handleConfirm }) => {
  const [tripData, setTripData] = useState({
    tripName: "",
    tripDate: "",
    tripLocation: "",
    tripMates: [],
  });

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  console.log(tripData,'TripData chk');

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
            <DatePicker
              name="tripDate"
              required
              label="Trip Date"
              onChange={handleChange}
            />
            <TextField
              name="tripLocation"
              placeholder="Enter the location you want to tour"
              onChange={handleChange}
            />
            <TextField
              name="tripMates"
              placeholder="Search and Select your Travel Mates"
              type="search"
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleConfirm} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TripModal;
