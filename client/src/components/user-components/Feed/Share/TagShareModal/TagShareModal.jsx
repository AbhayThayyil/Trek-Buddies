import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select"; // react select
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import {
  getAllFriendsData,
  getFriendsDetails,
} from "../../../../../Redux/slices/userSlice";
import { Stack } from "@mui/material";

const TagShareModal = ({ open, close, handleConfirm }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [tagged, setTagged] = useState([]);
//   console.log(tagged, "tagged chl");

  useEffect(() => {
    dispatch(getAllFriendsData({ axiosPrivate }));
  }, []);

  const friendsData = useSelector(getFriendsDetails);
  //   console.log(friendsData, "friendsData chk");

  const options = friendsData.map((friend) => ({
    label: `${friend.firstName} ${friend.lastName}`,
    value: friend._id,
  }));

  const handleSelection = (selected) => {
    setTagged(selected.map((selection) => selection.value));
  };

  const handleTaggedCancel = () => {
    setTagged([]);
    close();
  };
  const handleSubmit = (tagged) => {
    handleConfirm(tagged);
  };

  return (
    <>
      <Dialog open={open} onClose={handleTaggedCancel} fullWidth maxWidth="md">
        <DialogTitle>Tag your friends</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tag the people who were with you here
          </DialogContentText>
        </DialogContent>
        <Stack sx={{ height: "200px", margin: "20px" }}>
          <Select
            isMulti
            placeholder="Select friends to tag"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelection}
          />
        </Stack>
        <DialogActions>
          <Button onClick={close} sx={{ color: "red" }}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(tagged)} sx={{ color: "green" }}>
            Confirm{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TagShareModal;
