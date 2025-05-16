import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../features/auth/authActions"; // bu action'ı sen oluşturacaksın
import { useNavigate } from "react-router-dom";

const roles = ["USER", "ADMIN"];

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

const validationSchema = Yup.object({
  username: Yup.string().min(3).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "One uppercase required")
    .matches(/[a-z]/, "One lowercase required")
    .matches(/[0-9]/, "One number required")
    .required("Password is required"),
  role: Yup.string().oneOf(["USER", "ADMIN"]).required("Role is required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" mb={2}>Register</Typography>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          role: "USER",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(registerUser(values))
            .unwrap()
            .then(() => {
              resetForm();
              navigate("/login");
            })
            .catch((err) => {
              console.error("Register failed", err);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            {error && <Alert severity="error">{error}</Alert>}

            <FormikTextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
            />

            <FormikTextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
            />

            <FormikTextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />

            <FormikTextField
              name="role"
              label="Role"
              select
              fullWidth
              margin="normal"
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </FormikTextField>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid || isSubmitting || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
