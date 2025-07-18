import type { ReactNode } from 'react';

import { type LinkProps, Link as RouterLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface Props {
  children?: ReactNode;
  title: string;
  footerText: string;
  footerLink: {
    content: ReactNode;
    to: LinkProps['to'];
  };
}

export default function AuthLayout({
  children,
  title,
  footerText,
  footerLink,
}: Props) {
  return (
    <Paper
      sx={{
        maxWidth: '420px',
        pt: 3,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body2"
        sx={{ p: 2, fontSize: '18px', fontWeight: 'bold' }}
      >
        {title}
      </Typography>

      {children}

      <Typography sx={{ pt: 1, pb: 3 }}>
        {footerText}{' '}
        <Link component={RouterLink} to={footerLink.to}>
          {footerLink.content}
        </Link>
      </Typography>
    </Paper>
  );
}
