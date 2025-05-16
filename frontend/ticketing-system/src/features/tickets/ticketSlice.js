import { createSlice } from "@reduxjs/toolkit";
import { getTickets, replyTicket, createTicket } from "./ticketActions";

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    pageNumber: 0,
    pageSize: 5,
    totalPages: 0,
    totalElements: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload.tickets;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.loading = false;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(replyTicket.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.tickets.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.tickets[index] = updated;
        }
      });
  },
});



export default ticketSlice.reducer;
