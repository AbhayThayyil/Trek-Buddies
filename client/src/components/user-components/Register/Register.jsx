import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  TextField,
  FormControlLabel,
  Button,
  CssBaseline,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import "./register.css";
import { DateField, DatePicker } from "@mui/x-date-pickers";
import { Link,useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";

import axios from "../../../utils/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../helpers/ToastHelper";

// Firebase imports
import app from "../../../firebase-config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import OTPInput, { ResendOTP } from "otp-input-react";

const Register = () => {

  const navigate=useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, control, setValue, watch } = form;
  const { errors } = formState;

  const onSubmit =async (data, event) => {
    event.preventDefault();
    console.log(data);
    try{
      let response = await axios.post("/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        const successMessage = response.data.message;
        showToast(successMessage,"success")
        // console.log(response.data.message);

        navigate("/login");
      }
    }
    catch(error){
      const errorMessage = error.response.data.error;
      showToast(errorMessage,"error")
      console.log(error);
    }
  };

  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [showSend, setShowSend] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const auth = getAuth(app);

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = () => {
    //todo: set to false during production.This is for test only
    auth.settings.appVerificationDisabledForTesting = true;

    //

    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const number = "+91" + phoneNumber;

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        alert("OTP sent successfully!");
        setShowVerify(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onOtpVerify = () => {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        const user = res.user;
        console.log(user);
        alert("Verified");
        setMobileVerified(true);
        setShowVerify(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid otp");
      });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    console.log(value);
    setValue("phone", value);
    if (value.length === 10) {
      setShowSend(true);
    }
  };

  return (
    <>
      <form noValidate>
        <ToastContainer/>
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
          <div id="recaptcha-container"></div>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 7,
                marginBottom: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                boxShadow: 3,
                padding: 5,
                backgroundColor: "#F0E2D5",
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
                Sign up
              </Typography>
              <Typography component="h1" variant="h6">
                Fill this form to complete Registration
              </Typography>

              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2} justifyContent={"center"}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      {...register("firstName", {
                        required: "First Name is required",
                        validate: {
                          maxLength: (v) => {
                            return (
                              v.length <= 20 ||
                              "The First Name should have at most 20 characters"
                            );
                          },
                          minLength: (v) => {
                            return (
                              v.length > 2 ||
                              "The  Name should have at least 2 characters"
                            );
                          },
                          matchPattern: (v) =>
                            /^[a-zA-Z]{2,30}$/.test(v) ||
                            "Please enter a valid first name",
                        },
                      })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      {...register("lastName", {
                        required: "Last Name is required",
                        validate: {
                          maxLength: (v) => {
                            return (
                              v.length <= 20 ||
                              "The Last Name should have at most 20 characters"
                            );
                          },
                          minLength: (v) => {
                            return (
                              v.length >= 1 ||
                              "The Last Name should have at least 1 character"
                            );
                          },
                          matchPattern: (v) =>
                            /^[a-zA-Z]{1,20}$/.test(v) ||
                            "Please enter a valid last name",
                        },
                      })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        validate: {
                          maxLength: (v) => {
                            return (
                              v.length <= 50 ||
                              "The email should have at most 50 characters"
                            );
                          },
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="phone" // Use the same name as in defaultValues
                      control={control}
                      defaultValue="" // Initialize phone number with an empty string
                      rules={{ required: "Phone is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => handlePhoneChange(e)}
                          id="phone"
                          label="Mobile Number"
                          name="phone"
                          autoComplete="phone"
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                        />
                      )}
                    />

                    {showSend &&
                      (mobileVerified ? (
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          disabled
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Verified
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          fullWidth
                          onClick={onSignup}
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Send OTP to verify
                        </Button>
                      ))}
                  </Grid>
                  {showVerify && (
                    <Grid>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="otp-container"
                      />

                      <Button
                        type="button"
                        fullWidth
                        onClick={onOtpVerify}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Verify OTP
                      </Button>
                    </Grid>
                  )}

                  <Grid container spacing={2} padding={2}>
                    <Grid item xs={12} sm={6}>
                      <DateField
                        label="Date of Birth"
                        name="dob"
                        format="DD-MM-YYYY"
                        value={dob ? dob : null}
                        onChange={(newValue) => setDob(newValue)}
                        {...register("dob", {
                          required: "Date of Birth is required",
                        })}
                        error={!!errors.dob}
                        helperText={errors.dob?.message}
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={6}>
                      <DatePicker
                        name="dob"
                        label="Date of Birth"
                        value={dob}
                        onChange={(newValue) => setDob(newValue)}
                        {...register("dob", {
                          required: "Date of Birth is required",
                        })}
                        error={!!errors.dob}
                        helperText={errors.dob?.message}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender *
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="gender"
                          label="Gender"
                          defaultValue=""
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          error={!!errors.gender}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        {errors.gender && (
                          <FormHelperText sx={{ color: "#D32F2F" }}>
                            {errors.gender.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "Password is required",
                        validate: {
                          minLength: (v) => {
                            return (
                              v.length >= 4 ||
                              "Password must be atleast 4 characters"
                            );
                          },
                        },
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="cpassword"
                      label="Confirm Password"
                      type="password"
                      id="cpassword"
                      autoComplete="new-password"
                      {...register("cpassword", {
                        required: "Confirm Password is required",
                        validate: (enteredCPassword) =>
                          enteredCPassword === watch("password") ||
                          "Passwords do not match",
                      })}
                      error={!!errors.cpassword}
                      helperText={errors.cpassword?.message}
                    />
                  </Grid>
                </Grid>
                {mobileVerified ? (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                )}
                <Grid container justifyContent="flex-start">
                  <Grid item>
                    Already have an account?
                    <Link to="/login" variant="body2">
                      {" "}
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default Register;
