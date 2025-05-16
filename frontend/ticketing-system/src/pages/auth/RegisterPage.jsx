import { Container, Box, Paper } from "@mui/material";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt : 4, borderRadius: 2}}>
        <Box >
          <RegisterForm />
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
