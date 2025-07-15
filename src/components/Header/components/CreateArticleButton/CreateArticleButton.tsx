import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreateArticleButton() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}>
      <Button sx={{ ml: 27 }} variant="outlined" color="inherit">
        Write an article
      </Button>
    </Box>
  );
}
