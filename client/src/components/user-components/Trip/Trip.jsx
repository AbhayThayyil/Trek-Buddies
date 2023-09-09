import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import TripModal from "./TripModal/TripModal";

const Trip = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [tripModalOpen, setTripModalOpen] = useState(false);

  const handleTripButtonClick = () => {
    setTripModalOpen(true);
  };

  const handleTripButtonCancel = () => {
    setTripModalOpen(false);
  };

  const handleTripButtonConfirm = () => {
    //todo : Write code to dispatch trip creation
    setTripModalOpen(false);
  };

  return (
    <>
      <Box flex={3.5} p={2}>
        <Box
          className="tripCreate"
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#189AB4" }}
            endIcon={<AddIcon />}
            onClick={handleTripButtonClick}
          >
            Create a Trip
          </Button>
          <TripModal
            open={tripModalOpen}
            handleClose={handleTripButtonCancel}
            handleConfirm={handleTripButtonConfirm}
          />
        </Box>
        <Box margin={3} className="tripSearch">
          <TextField label="Search for Trips" type="search" fullWidth />
        </Box>
        <Box className="tripCards">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5">Trip Name</Typography>
              <Typography variant="h6">Location:Trip Location</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  margin: "5px",
                  gap: "10px",
                }}
              >
                <Typography>Admin:</Typography>
                <Avatar></Avatar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  margin: "5px",
                  gap: "10px",
                }}
              >
                <Typography>Trip Mates:</Typography>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar
                    alt="Agnes Walker"
                    src="/static/images/avatar/4.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                </AvatarGroup>
              </Box>
              <Box sx={{ margin: "5px", gap: "10px" }}>
                <Typography>Trip Date: DATE</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Trip;
