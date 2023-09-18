import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";

const LocationShareModal = ({ open, close, handleConfirm }) => {
  const [location, setLocation] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    handleConfirm(location);
    setLocation("");
  };
  return (
    <>
      <Dialog open={open} onClose={close} fullWidth maxWidth="md">
        <DialogTitle>Enter Location</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your location</DialogContentText>
        </DialogContent>
        <Stack sx={{ height: "200px", margin: "20px" }}>
          <TextField
            name="location"
            value={location}
            onChange={handleLocationChange}
          >
            Enter the location
          </TextField>
        </Stack>
        <DialogActions>
          <Button onClick={close} sx={{ color: "red" }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} sx={{ color: "green" }}>
            Confirm{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LocationShareModal;
