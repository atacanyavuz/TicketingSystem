import { AppBar, Container, Toolbar } from '@mui/material';

const AppBarContainer = ({ children }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ maxHeight: 50 }} >{children}</Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarContainer;
