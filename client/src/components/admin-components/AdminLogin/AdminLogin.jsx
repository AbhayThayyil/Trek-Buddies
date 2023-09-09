import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./adminLogin.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../helpers/ToastHelper";
import axios from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectAllStatus, updateUser } from "../../../Redux/slices/userSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const loading=useSelector(selectAllStatus)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    

    dispatch(updateUser({data,role:'adminAuth'}))
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
          className="adminMainBox"
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
                backgroundColor: "#DBEEE6",
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
                Admin Sign in
              </Typography>
              <Typography component="h1" variant="h6">
                Sign in for Admin Operations
              </Typography>
              <Box  noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                >
                  Sign In
                </Button>
              </Box>
              <DevTool control={control} />
            </Box>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default AdminLogin;
