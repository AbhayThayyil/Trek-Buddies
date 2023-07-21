import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import LoginPage from "./pages/user-pages/LoginPage/LoginPage";
import Signup from "./pages/user-pages/signupPage/Signup";
import Homepage from "./pages/user-pages/Homepage/Homepage";
// import OtpSignupPage from "./pages/user-pages/OtpSignupPage/OtpSignupPage";
import AdminLoginPage from "./pages/admin-pages/Admin-login/AdminLoginPage";
import AdminDashboardPage from "./pages/admin-pages/Admin-Dashboard page/AdminDashboardPage";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            {/* USER ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/otp" element={<OtpSignupPage />} /> */}

            {/* ADMIN ROUTES */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </>
  );
}

export default App;
