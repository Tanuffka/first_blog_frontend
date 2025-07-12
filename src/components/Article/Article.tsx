import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import ArticleDate from './ArticleDate';

const date = {
  createdAt: '2025-07-02T13:45:30Z',
};

export default function Article() {
  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
      <MuiCard variant="outlined">
        <Box
          sx={{
            height: '200px',
            img: { width: '100%', height: '100%', objectFit: 'cover' },
          }}
        >
          <img src="src/assets/placeholder-image.png" alt="placeholder image" />
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ pr: 1 }}>
              <MuiAvatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </Box>
            <Box>
              <Typography variant="h5">Name Surname</Typography>
              <ArticleDate createdAt={date.createdAt} />
            </Box>
          </Box>
          <Box sx={{ pl: 6, pt: 1 }}>
            <Typography variant="h6">Name of Article</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Dignissimos atque laudantium quod dolorem sit cupiditate provident
              quas natus, obcaecati alias quo explicabo magni ducimus eaque rem
              dolore accusamus earum voluptas. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Dignissimos atque laudantium quod
              dolorem sit cupiditate provident quas natus, obcaecati alias quo
              explicabo magni ducimus eaque rem dolore accusamus earum voluptas.
            </Typography>
          </Box>
        </CardContent>
      </MuiCard>
    </Grid>
  );
}
