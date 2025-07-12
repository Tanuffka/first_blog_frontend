import Typography from '@mui/material/Typography';

type ArticleDateProps = {
  createdAt: string;
};

const ArticleDate = ({ createdAt }: ArticleDateProps) => {
  const date = new Date(createdAt);

  const formatted = date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Typography variant="body2" color="text.secondary">
      {formatted}
    </Typography>
  );
};

export default ArticleDate;
