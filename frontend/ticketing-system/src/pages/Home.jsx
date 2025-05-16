import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Ticketing System
      </Typography>

      {!user && (
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
