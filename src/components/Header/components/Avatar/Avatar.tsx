import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useFetchMe } from 'src/hooks/useFetchMe';
import { useSession } from 'src/stores/useSession';
import { getAcronyms } from 'src/utils/helpers/user';

export default function Avatar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const { isAuthenticated, logout } = useSession();

  const { data: currentUser } = useFetchMe();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserProfile = () => {
    navigate('/profile');
    handleCloseUserMenu();
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
      data-testid="header-avatar"
      sx={{
        display: { alignItems: 'center', md: 'flex', xs: 'none' },
      }}
    >
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
            <MuiAvatar alt={userAcronyms} src={currentUser.avatarUrl} />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          keepMounted
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleOpenUserProfile}>
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
