import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Register() {
  return (
    <Paper
      sx={{
        maxWidth: '350px',
        pt: 3,
        mr: 67,
        ml: 67,
      }}
    >
      <Box
        noValidate
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        autoComplete="off"
      >
        <Typography
          variant="body2"
          sx={{ p: 2, fontSize: '18px', fontWeight: 'bold' }}
        >
          {' '}
          Registration{' '}
        </Typography>

        <TextField required id="outlined-required" label="Name" />
        <TextField required id="outlined-required" label="Email" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ mt: 1, mb: 2, width: '35ch' }}
        >
          Register
        </Button>
        <Typography sx={{ pt: 1, pb: 3 }}>
          Already have an account?{' '}
          <Link href="#" underline="none">
            Login
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}
