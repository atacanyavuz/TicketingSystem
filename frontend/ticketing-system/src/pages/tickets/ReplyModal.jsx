import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { replyTicket } from "../../features/tickets/ticketActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const ReplyModal = ({ open, onClose, ticket, onSuccess }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";

  const [replyText, setReplyText] = useState("");

  const handleSubmit = () => {
    dispatch(replyTicket({ ticketId: ticket.id, message: replyText }))
      .unwrap()
      .then(() => {
        setReplyText("");
        onClose();
        onSuccess?.();
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Ticket #{ticket.id}
        </Typography>

        <Typography variant="subtitle2">
          <strong>Title:</strong> {ticket.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Description:</strong> {ticket.description}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Status:</strong> {ticket.status}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Admin Reply
        </Typography>

        {ticket.reply ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Responder:</strong> {ticket.reply.responderEmail}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              <strong>Message:</strong> {ticket.reply.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(ticket.reply.createdAt).toLocaleString()}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
            No reply yet.
          </Typography>
        )}

        {/* Sadece admin cevap gönderebilsin */}
        {isAdmin && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Send a Reply
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Your Response"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                variant="contained"
                disabled={!replyText.trim()}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReplyModal;
