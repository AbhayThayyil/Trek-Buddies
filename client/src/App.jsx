import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import LoginPage from "./pages/user-pages/LoginPage/LoginPage";
import Signup from "./pages/user-pages/signupPage/Signup";
import Homepage from "./pages/user-pages/Homepage/Homepage";

// import OtpSignupPage from "./pages/user-pages/OtpSignupPage/OtpSignupPage";
import AdminLoginPage from "./pages/admin-pages/Admin-login/AdminLoginPage";
import AdminDashboardPage from "./pages/admin-pages/Admin-Dashboard page/AdminDashboardPage";
import Missing from "./components/user-components/404/404";

// authentication for protected route
import RequireAuth from "./components/RequireAuth";
import Users from "./components/Users";
import ProfilePage from "./pages/user-pages/ProfilePage/ProfilePage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* USER ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />

            {/* PROTECTED ROUTES */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/listUsers" element={<Users />} />
            </Route>

            <Route path="/profile/:userId" element={<ProfilePage />} />
            {/* <Route path="/otp" element={<OtpSignupPage />} /> */}

            {/* ADMIN ROUTES */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
