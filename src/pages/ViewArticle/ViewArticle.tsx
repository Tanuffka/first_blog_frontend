import { useParams } from 'react-router';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { useFetchArticle } from 'src/hooks/useFetchArticle';
import ArticleDate from 'src/components/Article/ArticleDate';
import { getAcronyms, getFullName } from 'src/utils/helpers/user';

export default function ViewArticle() {
  const { id } = useParams<{ id: string }>();

  const { data: article, isLoading } = useFetchArticle(id!);

  if (isLoading) {
    return (
      <Grid container flex={1} justifyContent="center" sx={{ py: 5 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3, px: 6 }}>
        <Typography variant="h5" component="h1" fontWeight={500}>
          View
        </Typography>
      </Box>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '600px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '400px',
            backgroundColor: 'grey',
            img: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
        >
          <img src="/images/placeholder-image.png" alt="placeholder image" />
        </Box>
        <Box sx={{ p: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ pr: 1 }}>
              <MuiAvatar
                alt={getAcronyms(
                  article.author.firstname,
                  article.author.lastname
                )}
                src="/static/images/avatar/2.jpg"
              />
            </Box>
            <Box>
              <Typography>
                {getFullName(article.author.firstname, article.author.lastname)}
              </Typography>
              <ArticleDate createdAt={article.createdAt} />
            </Box>
          </Box>
          <Box sx={{ mt: 2, width: '100%' }}>
            <Box position="relative">
              <Typography variant="h6" component="h1">
                {article.title}
              </Typography>
            </Box>
            <Typography sx={{ mt: 2 }} variant="body2">
              {article.content}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
