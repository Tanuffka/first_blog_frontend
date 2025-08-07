import type { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface Props {
  title: string;
  children?: ReactNode;
}

export default function ArticleLayout({ title, children }: Props) {
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
    </Container>
  );
}
