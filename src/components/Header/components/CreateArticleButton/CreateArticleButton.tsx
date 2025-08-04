import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useSession } from 'src/stores/useSession';

export default function CreateArticleButton() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        to="/create-article"
        variant="text"
        color="inherit"
        type="submit"
        sx={{ mx: 5 }}
      >
        Create article
      </Button>
    </Box>
  );
}
