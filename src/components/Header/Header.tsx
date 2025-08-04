import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Avatar from 'src/components/Header/components/Avatar';
import Logo from 'src/components/Logo';
import { useSession } from 'src/stores/useSession';

import CreateArticleButton from './components/CreateArticleButton';
import RegisterButton from './components/RegisterButton';
import LoginButton from './components/LoginButton';

export default function Header() {
  const { isAuthenticated } = useSession();

  return (
    <AppBar
      position="static"
      sx={{
        mb: 5,
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between' }}>
          <Logo />
          <Grid container>
            {!isAuthenticated && <LoginButton />}
            {!isAuthenticated && <RegisterButton />}
            {isAuthenticated && <CreateArticleButton />}
            {isAuthenticated && <Avatar />}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
