import * as React from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const settings = ['Logout'];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (e) => setAnchorElUser(e.currentTarget);
  const handleClose = () => setAnchorElUser(null);

  const handleMenuClick = (option) => {
    handleClose();

    if (option === 'Logout') {
      dispatch(logout());
      navigate('/');
    } else if (option === 'Profile') {
      navigate('/profile');
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 0,
      ml: "auto"
    }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar/>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
