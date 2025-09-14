import type { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

interface Props {
  children?: ReactNode;
  title: string;
  sidebar?: ReactNode;
}

export default function ContentLayout({ children, title, sidebar }: Props) {
  return (
    <Container maxWidth="md">
      <Box>
        <Typography
          variant="h5"
          component="h1"
          fontWeight={500}
          sx={{ py: 3, px: 6 }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid flex={1}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 6,
            }}
          >
            {children}
          </Paper>
        </Grid>
        {sidebar}
      </Grid>
    </Container>
  );
}
