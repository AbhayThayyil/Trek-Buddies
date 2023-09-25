import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import LoginPage from "./pages/user-pages/LoginPage/LoginPage";
import Signup from "./pages/user-pages/signupPage/Signup";
import Homepage from "./pages/user-pages/Homepage/Homepage";

// import OtpSignupPage from "./pages/user-pages/OtpSignupPage/OtpSignupPage";
import AdminLoginPage from "./pages/admin-pages/Admin-login/AdminLoginPage";
import AdminDashboardPage from "./pages/admin-pages/Admin-Dashboard page/AdminDashboardPage";
import UserListPage from "./pages/admin-pages/UserListPage/UserListPage";
import Missing from "./components/user-components/404/404";

// authentication for protected route
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/user-components/PersistLogin";

import Users from "./components/Users";
import ProfilePage from "./pages/user-pages/ProfilePage/ProfilePage";
import Layout from "./components/Layout";
import TripPage from "./pages/user-pages/TripPage/TripPage";
import AdminLayout from "./pages/admin-pages/adminLayout";
import PostsListPage from "./pages/admin-pages/PostsListPage/PostsListPage";
import ReportsListPage from "./pages/admin-pages/ReportsListPage/ReportsListPage";
import ChatPage from "./pages/user-pages/ChatPage/ChatPage";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* PUBLIC USER ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />

            {/* PROTECTED ROUTES */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/listUsers" element={<Users />} />
                <Route path="/trip" element={<TripPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Route>
            </Route>

            <Route path="/profile/:userId" element={<ProfilePage />} />
            {/* <Route path="/otp" element={<OtpSignupPage />} /> */}

            {/* ADMIN ROUTES */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<RequireAuth isAdmin={true} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/userList" element={<UserListPage />} />
                <Route path="/admin/postsList" element={<PostsListPage />} />
                <Route
                  path="/admin/reportsList"
                  element={<ReportsListPage />}
                />
              </Route>
            </Route>
            {/* Catch all (Missing mostly ) */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
