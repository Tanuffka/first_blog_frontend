import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreateAnAccountButton() {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button variant="text" color="inherit">
        Create an Account
      </Button>
    </Box>
  );
}
