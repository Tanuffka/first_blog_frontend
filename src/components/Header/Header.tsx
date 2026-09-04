import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

import Avatar from 'src/components/Header/components/Avatar';
import Logo from 'src/components/Logo';

import CreateArticleButton from './components/CreateArticleButton';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';

export default function Header() {
  return (
    <AppBar
      position="static"
      data-testid="main-app-header"
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
