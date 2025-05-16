import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../features/tickets/ticketActions";

const TicketList = () => {
  const dispatch = useDispatch();

  const { tickets, loading, error, pageNumber, totalPages } = useSelector((state) => state.tickets);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";

  const [filter, setFilter] = useState("ALL");
  useEffect(() => { 
    dispatch(getTickets({ page: 0, size: 5, status: filter }));
  }, [dispatch, isAdmin, filter]);
  
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Ticket List
      </Typography>

      {isAdmin && (
        <ButtonGroup sx={{ mb: 2 }}>
          {["ALL", "OPEN", "ANSWERED", "CLOSED"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "contained" : "outlined"}
              onClick={() => setFilter(status)}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
      )}

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
            variant="outlined"
            disabled={pageNumber === 0}
            onClick={() => dispatch(getTickets({ page: pageNumber - 1, size: 5 }))}
        >
            ← Prev
        </Button>

        <Typography>
            Page {pageNumber + 1} of {totalPages}
        </Typography>

        <Button
            variant="outlined"
            disabled={pageNumber + 1 >= totalPages}
            onClick={() => dispatch(getTickets({ page: pageNumber + 1, size: 5 }))}
        >
            Next →
        </Button>
        </Box>
    </Box>
  );
};

export default TicketList;
