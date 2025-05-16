import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../../features/tickets/ticketActions";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const CreateTicketModal = ({ open, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await dispatch(createTicket(form)).unwrap();
      setForm({ title: "", description: "" });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Ticket creation failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Create New Ticket
        </Typography>

        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title || !form.description || submitting}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTicketModal;
