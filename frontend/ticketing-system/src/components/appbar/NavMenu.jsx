import { Box, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';

const NavMenu = () => {
  const pages = [
    { label: 'Tickets', path: '/tickets' },
  ];
  const navigate = useNavigate();
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
            <MenuItem key={page.label} onClick={() => navigate(page.path)}>
              <Typography>{page.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Desktop */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
        <Button key={page.label} onClick={() => navigate(page.path)}
          sx={{ my: 2, color: 'white', display: 'block' }}
        > 
          {page.label}
        </Button>
        ))}
      </Box>
    </>
  );
};

export default NavMenu;
