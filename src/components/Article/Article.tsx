import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import ArticleDate from './ArticleDate';

interface UserApiSchema {
  _id: string;
  firstname: string;
  lastname: string;
}

interface ArticleProps {
  _id: string;
  title: string;
  content: string;
  author: UserApiSchema;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function Article({
  title,
  content,
  author,
  createdAt,
}: ArticleProps) {
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 1,
        width: '100%',
      }}
    >
      <Card variant="outlined">
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
              <Typography variant="h5">{`${author.firstname} ${author.lastname}`}</Typography>
              <ArticleDate createdAt={createdAt} />
            </Box>
          </Box>
          <Box sx={{ pl: 6, pt: 1 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{content}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
