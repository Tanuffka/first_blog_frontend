import { Card, Grid, Typography } from '@mui/material';
import Comment from './components/Comment/Comment';
import ArticleCommentForm from './components/ArticleCommentForm';
import { useParams } from 'react-router-dom';
import { useFetchComments } from 'src/hooks/useFetchComments';
// import Box from '@mui/material/Box';

export default function ArticleComments() {
  const { id } = useParams<{ id: string }>();

  const { data: comments } = useFetchComments(id!);

  return (
    <Card
      sx={{
        width: '100%',
        border: '1px',
        padding: 6,
        marginY: 4,
      }}
    >
      <Typography
        marginBottom={3}
        variant="body1"
        sx={{ fontSize: '18px', fontWeight: 'normal' }}
      >
        Comments
      </Typography>
      <ArticleCommentForm />
      <Grid container spacing={2} mt={3}>
        {comments?.map((comment) => (
          <Grid size={13} key={comment._id}>
            <Comment {...comment} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
