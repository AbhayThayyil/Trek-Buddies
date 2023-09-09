import axios from "../utils/axios";


// This service is used for using login operation of both user and admin in redux thunk

const authService = {
  login: async ({data, role}) => {
    try {
        // console.log(data,role,"check in service");
      const response = await axios.post(`${role}/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
     
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};

export default authService;
