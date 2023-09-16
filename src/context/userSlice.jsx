import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IP_ADDRESS = "100.112.29.23";
const PORT = "4040";
const API_URL = `http://${IP_ADDRESS}:${PORT}/api/v1/`;

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (currentUser) => {
    try {
      const res = await axios.post(`${API_URL}auth/register`, currentUser);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (currentUser) => {
    try {
      const res = await axios.post(`${API_URL}auth/login`, currentUser);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.alertText = "";
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.alertType = "success";
      state.alertText = "User Created! Redirecting...";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.alertType = "danger";
      alertText = action.payload.msg;
    });

    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.alertType = "success";
      state.alertText = "Login Successful! Redirecting...";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.alertType = "danger";
      alertText = action.payload.msg;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
