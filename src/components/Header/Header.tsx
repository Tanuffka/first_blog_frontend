import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Avatar from 'src/components/Avatar';
import Logo from 'src/components/Logo';

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifySelf: 'center',
          }}
        >
          <Logo />
          <Avatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
