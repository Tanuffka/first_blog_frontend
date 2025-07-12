import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreateArticleButton() {
  return (
    <Box sx={{ pl: 27, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button variant="outlined" color="inherit">
        Write an article
      </Button>
    </Box>
  );
}
