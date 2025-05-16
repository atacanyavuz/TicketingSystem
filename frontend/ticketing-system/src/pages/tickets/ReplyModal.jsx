import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { replyTicket } from "../../features/tickets/ticketActions";

import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as Yup from "yup";


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

const FormikTextField = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};


const ReplyModal = ({ open, onClose, ticket, onSuccess }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";

  const replySchema = Yup.object().shape({
  replyText: Yup.string()
    .required("Reply message is required")
    .min(5, "Reply must be at least 5 characters"),
  });

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

        {isAdmin && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Send a Reply
            </Typography>
            <Formik
              initialValues={{ replyText: "" }}
              validationSchema={replySchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                dispatch(replyTicket({ ticketId: ticket.id, message: values.replyText }))
                  .unwrap()
                  .then(() => {
                    resetForm();
                    onClose();
                    onSuccess?.();
                  })
                  .finally(() => setSubmitting(false));
              }}
            >
              {({ isSubmitting, isValid, dirty  }) => (
                <Form>
                  <FormikTextField
                    name="replyText"
                    label="Your Response"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                  />

                  <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Send
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReplyModal;
