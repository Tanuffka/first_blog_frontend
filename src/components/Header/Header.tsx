import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Avatar from 'src/components/Header/components/Avatar';
import Logo from 'src/components/Logo';

import CreateArticleButton from './components/CreateArticleButton';

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        mb: 5,
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Logo />
          <CreateArticleButton />
          <Avatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
