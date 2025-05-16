import React from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../../features/tickets/ticketActions";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
    width: {
    xs: "90%", 
    sm: 400,   
    md: 500,   
  },
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

const ticketSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Must be at least 5 characters")
    .max(100, "Max 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Must be at least 10 characters"),
});

const CreateTicketModal = ({ open, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Create New Ticket
        </Typography>

        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={ticketSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(createTicket(values))
              .unwrap()
              .then(() => {
                resetForm();
                onSuccess?.();
                onClose();
              })
              .catch((err) => {
                console.error("Ticket creation failed:", err);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <FormikTextField
                name="title"
                label="Title"
                fullWidth
                margin="normal"
              />
              <FormikTextField
                name="description"
                label="Description"
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
                  disabled={!dirty || !isValid || isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default CreateTicketModal;
