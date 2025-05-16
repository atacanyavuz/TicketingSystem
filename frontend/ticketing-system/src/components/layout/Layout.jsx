import ResponsiveAppBar from "../appbar/ResponsiveAppBar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
