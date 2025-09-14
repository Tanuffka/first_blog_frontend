import { useState } from 'react';
import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MuiAvatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useSession } from 'src/stores/useSession';
import { getAcronyms } from 'src/utils/helpers/user';
import { useFetchMe } from 'src/hooks/useFetchMe';

export default function Avatar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const { logout, isAuthenticated } = useSession();

  const { data: currentUser } = useFetchMe();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout().then(() => {
      handleCloseUserMenu();
      navigate('/login');
    });
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const userAcronyms = getAcronyms(currentUser.firstname, currentUser.lastname);

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex', alignItems: 'center' },
      }}
    >
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
            <MuiAvatar alt={userAcronyms} src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          keepMounted
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem component={Link} to="/profile">
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              Profile
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
