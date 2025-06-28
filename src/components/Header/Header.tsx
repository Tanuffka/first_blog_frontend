import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Avatar from '../Avatar/Avatar';
import Logo from '../Logo';

export default function Header() {
  return (
    <AppBar position="static">
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
