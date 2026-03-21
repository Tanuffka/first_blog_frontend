import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { useFetchArticle } from 'src/hooks/useFetchArticle';

import Date from 'src/components/PostingDate';
import { getAcronyms, getFullName } from 'src/utils/helpers/user';
import { useFetchMe } from 'src/hooks/useFetchMe';
import TextEditor from 'src/components/TextEditor';
import { getPublicFileURL } from 'src/utils/helpers/s3';

import ButtonDeleteArticle from './components/ButtonDeleteArticle';
import ArticleComments from 'src/components/ArticleComments';

export default function ViewArticle() {
  const { id } = useParams<{ id: string }>();

  const { data: currentUser } = useFetchMe();

  const { data: article, isLoading } = useFetchArticle(id!);

  const isCurrentUserAuthor = currentUser?._id === article?.author._id;

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

  const articleCoverImageURL = getPublicFileURL(article.coverImage);

  return (
    <Container maxWidth="md">
      <Grid container sx={{ justifyContent: 'space-between', py: 3, px: 6 }}>
        <Typography variant="h5" component="h1" fontWeight={500}>
          View
        </Typography>
        {isCurrentUserAuthor && (
          <Grid container spacing={2}>
            <Button
              component={Link}
              to={`/articles/${id}/edit`}
              variant="outlined"
              size="small"
              sx={{
                borderWidth: 2,
                fontWeight: 800,
              }}
            >
              Edit
            </Button>
            <ButtonDeleteArticle id={id!} />
          </Grid>
        )}
      </Grid>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '600px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '400px',
            backgroundColor: 'grey',
            backgroundImage: 'url(/images/image-placeholder.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            img: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
        >
          {articleCoverImageURL && (
            <img src={articleCoverImageURL} alt="article cover" />
          )}
        </Box>
        <Grid container flexDirection="column" p={6}>
          <Grid container alignItems="center" spacing={2} mb={2}>
            <MuiAvatar
              alt={getAcronyms(
                article.author.firstname,
                article.author.lastname,
              )}
              src={article.author.avatarUrl}
            />
            <Box>
              <Typography>
                {getFullName(article.author.firstname, article.author.lastname)}
              </Typography>
              <Date createdAt={article.createdAt} />
            </Box>
          </Grid>
          <Grid>
            <Typography variant="h6" component="h1">
              {article.title}
            </Typography>
          </Grid>
          <Grid>
            <TextEditor editable={false} content={article.content} />
          </Grid>
        </Grid>
      </Paper>
      <ArticleComments />
    </Container>
  );
}
