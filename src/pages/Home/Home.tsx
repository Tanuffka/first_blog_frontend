import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Article from 'src/components/Article';
import Sidebar from 'src/components/Sidebar';
import { publicApi } from 'src/shared/api';
import { type ArticleApiResponseSchema } from 'src/shared/api';

export default function Home() {
  const [articles, setArticles] = useState<ArticleApiResponseSchema[]>([]);

  useEffect(() => {
    publicApi
      .get<ArticleApiResponseSchema[]>('/api/articles')
      .then((response) => response.data)
      .then((articles) => setArticles(articles));
  }, []);

  return (
    <Container maxWidth="md" sx={{ display: 'flex' }}>
      <Grid container spacing={2} flex={1}>
        {articles.map((article) => (
          <Article key={article._id} {...article} />
        ))}
      </Grid>
      <Sidebar />
    </Container>
  );
}
