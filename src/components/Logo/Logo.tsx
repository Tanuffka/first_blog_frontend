import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Logo() {
  return (
    <Box>
      <Typography
        noWrap
        variant="h6"
        component={Link}
        to={'/'}
        sx={{
          mr: 31,
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
    </Box>
  );
}
