import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OTPInput, { ResendOTP } from "otp-input-react";
import "./otp.css";
import { SECTION_TYPE_GRANULARITY } from "@mui/x-date-pickers/internals/utils/getDefaultReferenceDate";

const Otp = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);

  // To setup Recaptcha
  const setUpRecaptcha = (number) => {
    (window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log(response);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    })),
      auth;
  };

  // To get otp from user
  const getOtp = (e) => {
    e.preventDefault();
    console.log(number);
    setUpRecaptcha();
    const recaptchaVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, number, recaptchaVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

    
  // to verify otp entered by user

  return (
    <>
      <Box
        className="mainBox"
        bgcolor={"lightblue"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Toaster toastOptions={{ duration: 4000 }} />
        <Container
          component="main"
          maxWidth="xs"
          className="container"
          sx={{ backgroundImage: "none", marginTop: "10px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              boxShadow: 3,
              padding: 5,
              backgroundColor: "#D8DEDE",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <Typography
                fontFamily="Irish Grover"
                fontWeight={700}
                fontSize={25}
                color={"#D4F1F4"}
              >
                TB
              </Typography>
            </Avatar>
            <Typography component="h1" variant="h4">
              OTP Verification
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Box sx={{ display: flag ? "none" : "block", width: "100%" }}>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="IN"
                  value={number}
                  onChange={setNumber}
                  className="custom-phone-input"
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
                      onClick={getOtp}
                      id="getOtpButton"
                    >
                      Send OTP
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/">
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: flag ? "block" : "none" }}>
                <Typography
                  display={"flex"}
                  justifyContent={"center"}
                  component="h1"
                  variant="h5"
                >
                  Enter OTP{" "}
                </Typography>
                
                <OTPInput
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                  value={otp}
                  onChange={setOtp}
                ></OTPInput>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
                  //   onClick={verifyOtp}
                >
                  Verify OTP
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <div className="recaptcha-container"></div>
    </>
  );
};

export default Otp;
