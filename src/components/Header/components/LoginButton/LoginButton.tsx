import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useSession } from 'src/stores/useSession';

export default function LoginButton() {
  const { isAuthenticated } = useSession();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ ml: 23, mr: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        variant="text"
        color="inherit"
        type="submit"
        to="/login"
      >
        Login
      </Button>
    </Box>
  );
}
