import { Box, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';

const NavMenu = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpen = (e) => setAnchorElNav(e.currentTarget);
  const handleClose = () => setAnchorElNav(null);

  return (
    <>
      {/* Mobile */}
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton size="large" color="inherit" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleClose}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Desktop */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleClose}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default NavMenu;
