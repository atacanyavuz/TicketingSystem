import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async ({ page = 0, size = 5, status = "ALL" }, { getState, rejectWithValue }) => {
    try {
      const { accessToken, role } = getState().auth.user;

      let response;

      if (role === "ADMIN") {
        const body = { page, size };
        if (status !== "ALL") body.status = status;

        response = await axios.post("/api/tickets/all", body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        response = await axios.get("/api/tickets", {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { page, size },
        });
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch tickets");
    }
  }
);

export const replyTicket = createAsyncThunk(
  "tickets/replyTicket",
  async ({ ticketId, message }, {getState, rejectWithValue }) => {
    try {
      const accessToken  = getState().auth.user.accessToken;
      const response = await axios.post("/api/replies/create",
        {
          ticketId,
          message,
        }
        ,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Reply failed"
      );
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async ({ title, description }, { getState, rejectWithValue }) => {
    try {
      const { accessToken, role } = getState().auth.user;

      if (role !== "USER") {
        return rejectWithValue("Only users can create tickets.");
      }

      const response = await axios.post(
        "/api/tickets/create",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Ticket creation failed"
      );
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  "tickets/updateTicketStatus",
  async ({ ticketId, status }, { getState, rejectWithValue }) => {
    try {
      const { accessToken, role } = getState().auth.user;

      if (role !== "ADMIN") {
        return rejectWithValue("Unauthorized: Only admins can update status.");
      }

      const response = await axios.put(
        "/api/tickets/update-status",
        { ticketId, status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update ticket status"
      );
    }
  }
);
