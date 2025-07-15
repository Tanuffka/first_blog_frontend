import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function LoginButton() {
  return (
    <Box sx={{ ml: 23, mr: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button variant="text" color="inherit">
        Login
      </Button>
    </Box>
  );
}
