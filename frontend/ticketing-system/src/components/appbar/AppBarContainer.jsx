import { AppBar, Container, Toolbar } from '@mui/material';

const AppBarContainer = ({ children }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>{children}</Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarContainer;
