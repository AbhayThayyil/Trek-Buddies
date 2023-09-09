import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField } from "@mui/material";

const ReportPost = ({ open, handleClose, handleConfirm, postId }) => {
  const [reportReasonText, setReportReasonText] = useState("");

  const handleReportSubmit = () => {
    handleConfirm(reportReasonText);
    // setReportReasonText("");
  };
  //   console.log(reportObject, "report obj");

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Report the Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter the reason for reporting the post.Please enter valid reasons
            only !!
          </DialogContentText>
          <TextField
            name="reportReason"
            fullWidth
            sx={{ marginTop: "10px" }}
            placeholder="Enter the reason for report"
            required
            value={reportReasonText}
            onChange={(e) => setReportReasonText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleReportSubmit} autoFocus>
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportPost;
