import { Box, Typography, Container, Paper } from "@mui/material";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Please login to your account
          </Typography>
        </Box>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default Login;
