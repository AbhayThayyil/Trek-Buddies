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
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import TripModal from "./TripModal/TripModal";
import {
  dropTrip,
  getTrips,
  joinTrip,
  leaveTrip,
  listAllTrips,
  searchTrip,
} from "../../../Redux/slices/tripSlice";
import { selectAllUsers } from "../../../Redux/slices/userSlice";

const Trip = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [tripModalOpen, setTripModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTrips({ axiosPrivate }));
  }, []);

  const user = useSelector(selectAllUsers);
  console.log(user, "user info chk");

  const tripsList = useSelector(listAllTrips);
  console.log(tripsList, "triplist chk");

  // To search trips

  const [searchText, setSearchText] = useState("");

  const { searchData } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(searchTrip(searchText));
  }, [searchText]);

  // To create a trip
  const handleTripButtonClick = () => {
    setTripModalOpen(true);
  };

  const handleTripButtonCancel = () => {
    setTripModalOpen(false);
  };

  const handleTripButtonConfirm = () => {
    setTripModalOpen(false);
  };

  // Exisiting trip operations

  const handleTripDrop = (tripId) => {
    dispatch(dropTrip({ axiosPrivate, tripId })).then(() => {
      dispatch(getTrips({ axiosPrivate }));
    });
  };

  const handleTripJoin = (tripId) => {
    dispatch(joinTrip({ axiosPrivate, tripId })).then(() => {
      dispatch(getTrips({ axiosPrivate }));
    });
  };

  const handleTripLeave = (tripId) => {
    dispatch(leaveTrip({ axiosPrivate, tripId })).then(() => {
      dispatch(getTrips({ axiosPrivate }));
    });
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
          <TextField
            label="Search for Trips"
            type="search"
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>
        <Box className="tripCards">
          {tripsList
            .filter((trip) => {
              if (searchData.length === 0) {
                return trip;
              } else {
                return (
                  trip.tripName
                    .toLowerCase()
                    .includes(searchData.toLowerCase()) ||
                  trip.createdBy.firstName
                    .toLowerCase()
                    .includes(searchData.toLowerCase()) ||
                  trip.tripLocation
                    .toLowerCase()
                    .includes(searchData.toLowerCase())
                );
              }
            })

            .map((trip) => (
              <Card sx={{ minWidth: 275, margin: "10px" }}>
                <CardContent>
                  <Typography variant="h5">{trip?.tripName}</Typography>
                  <Typography variant="h6">
                    Location:{trip?.tripLocation}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: "5px",
                      gap: "10px",
                    }}
                  >
                    <Typography>Admin:{trip?.createdBy.firstName}</Typography>
                    <Avatar
                      src={
                        trip.createdBy.profilePicture
                          ? trip.createdBy.profilePictureURL
                          : "/Images/noUser.jpg"
                      }
                    />
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
                      {trip?.tripMates?.map((element) => (
                        <Avatar
                          alt={element._id}
                          key={element._id}
                          src={
                            element.profilePicture
                              ? element.profilePictureURL
                              : "/Images/noUser.jpg"
                          }
                        />
                      ))}
                    </AvatarGroup>
                  </Box>
                  <Box sx={{ margin: "5px", gap: "10px" }}>
                    <Typography>
                      Trip Date:{" "}
                      {trip ? new Date(trip.tripDate).toLocaleString() : ""}
                    </Typography>
                  </Box>

                  {trip.createdBy?._id === user._id ? (
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => handleTripDrop(trip._id)}
                    >
                      Drop trip
                    </Button>
                  ) : trip.tripMates.some((mate) => mate._id === user._id) ? (
                    <Button onClick={() => handleTripLeave(trip._id)}>
                      Leave
                    </Button>
                  ) : (
                    <Button
                      sx={{ color: "green" }}
                      onClick={() => handleTripJoin(trip._id)}
                    >
                      Join
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Trip;
