import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Avatar from 'src/components/Header/components/Avatar';
import Logo from 'src/components/Logo';

import CreateArticleButton from './components/CreateArticleButton';
import RegisterButton from './components/RegisterButton';
import LoginButton from './components/LoginButton';

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        mb: 5,
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Logo />
          <Grid container>
            <LoginButton />
            <RegisterButton />
            <CreateArticleButton />
            <Avatar />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
