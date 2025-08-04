import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreateArticleButton() {
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
