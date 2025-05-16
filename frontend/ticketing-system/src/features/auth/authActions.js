import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk( "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { accessToken, username, email: userEmail, role } = response.data;
      const userData = {
        accessToken,
        username,
        email: userEmail,
        role,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);
