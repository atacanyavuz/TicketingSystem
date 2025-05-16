import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async ({ page = 0, size = 5 }, {getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.accessToken;
      const response = await axios.get("/api/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, size },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch tickets");
    }
  }

);
