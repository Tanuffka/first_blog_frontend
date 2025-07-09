import { CardContent, Divider, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiCard from '@mui/material/Card';

export default function Comments() {
  return (
    <MuiCard
      variant="outlined"
      sx={{
        height: '242px',
        width: '300px',
        mt: 2,
        display: 'flex',
        alignContent: 'center',
      }}
    >
      <CardContent>
        <Typography
          variant="body1"
          sx={{ fontSize: '18px', fontWeight: 'normal' }}
        >
          Comments
        </Typography>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <Link
            underline="none"
            color="inherit"
            sx={{ mt: 1, display: 'flex' }}
          >
            <Box sx={{ pr: 1 }}>
              <MuiAvatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography>Name Surname</Typography>
              <Typography
                variant="subtitle2"
                sx={{ pb: 2, color: 'text.secondary' }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </Typography>
            </Box>
          </Link>
        </Box>
        <Divider />
        <Box sx={{ mt: 1, display: 'flex' }}>
          <Link
            underline="none"
            color="inherit"
            sx={{ mt: 1, display: 'flex' }}
          >
            <Box sx={{ pr: 1 }}>
              <MuiAvatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography>Name Surname</Typography>
              <Typography
                variant="subtitle2"
                sx={{ pb: 2, color: 'text.secondary' }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </Typography>
            </Box>
          </Link>
        </Box>
      </CardContent>
    </MuiCard>
  );
}
