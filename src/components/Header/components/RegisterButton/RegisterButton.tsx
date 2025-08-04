import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function RegisterButton() {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        variant="text"
        color="inherit"
        type="submit"
        to="/register"
      >
        Register
      </Button>
    </Box>
  );
}
