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
import React from "react";
import axios from "../../../utils/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../helpers/ToastHelper";

import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  selectAllUsers,
  selectAllStatus,
  selectAllError,
} from "../../../Redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const loading=useSelector(selectAllStatus)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // console.log(from, "from location");

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data, "onsubmit data");

    dispatch(updateUser({data,role:'auth'}))
      .unwrap()
      .then((response) => {
        if (response) {
          console.log(response,"response after login");
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        showToast(errorMessage, "error");
      });
  };


  return (
    <>
      <form noValidate>
        <ToastContainer />
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
                Sign in
              </Typography>

              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
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
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading==='loading'?true:false}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    Don't have an account?
                    <Link to="/signup" variant="body2">
                      {" "}
                      Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>

              <DevTool control={control} />
            </Box>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default Login;
