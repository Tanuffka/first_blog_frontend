import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';

export default function AvatarContainer() {
  return (
    <Grid sx={{ width: 300 }}>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            width: 300 - 32,
            height: 300 - 32,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: 'url(/images/avatar-placeholder.png)',
            borderColor: grey[300],
            borderWidth: 1,
            borderStyle: 'solid',
            img: {
              width: '100%',
              height: '100%',
            },
          }}
        >
          {/* <img src="/images/avatar-placeholder.png" alt="avatar placeholder" /> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
          }}
        >
          <Button fullWidth variant="contained">
            Upload
          </Button>
          <Button fullWidth variant="outlined" color="error" sx={{ mt: 1 }}>
            Remove
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
