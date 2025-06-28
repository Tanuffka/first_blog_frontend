import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Logo() {
  return (
    <Box>
      <Typography
        noWrap
        variant="h6"
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 70,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        FIRST BLOG
      </Typography>
      <Typography
        noWrap
        variant="h5"
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        FIRST BLOG
      </Typography>
    </Box>
  );
}
