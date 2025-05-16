import React from "react";
import { Typography, Box } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Link } from "react-router-dom"; // Bu şart!

const LogoTitle = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        textDecoration: "none",
        color: "#ffffff",
        transition: "0.3s ease",
        mr: 2,
        "&:hover": {
          color: "#90caf9",
        },
      }}
    >
      <SupportAgentIcon sx={{ mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontFamily: "Roboto Slab, monospace",
          fontWeight: "bold",
          letterSpacing: ".15rem",
          textTransform: "uppercase",
        }}
      >
        Ticketing System
      </Typography>
    </Box>
  );
};

export default LogoTitle;
