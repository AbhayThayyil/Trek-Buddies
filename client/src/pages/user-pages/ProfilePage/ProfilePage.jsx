import { Box, Stack } from "@mui/material";
import Navigationbar from "../../../components/user-components/Navigationbar/Navigationbar";
import Sidebar from "../../../components/user-components/Sidebar/Sidebar";
import Profile from "../../../components/user-components/Profile/Profile";
import Rightbar from "../../../components/user-components/Rightbar/Rightbar";

const ProfilePage = () => {
  return (
    <>
      <Box bgcolor={'#edf0f5'}>
        <Navigationbar />
        <Box marginLeft={5} marginRight={5}>
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <Profile />
          </Stack>
        </  Box>
      </Box>
    </>
  );
};

export default ProfilePage;
