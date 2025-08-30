import { useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import Article from 'src/components/Article';
import Sidebar from 'src/components/Sidebar';
// import { useArticleStore } from 'src/stores/useArticleStore';
import { useFetchArticles } from 'src/hooks/useFetchArticles';

export default function Home() {
  // const articles = useArticleStore((state) => state.articles);
  // const fetchAllArticles = useArticleStore((state) => state.fetchAllArticles);
  // const isLoading = useArticleStore((state) => state.isLoading);
  const { data: articles = [], isLoading } = useFetchArticles();

  useEffect(() => {
    // fetchAllArticles();
  }, []);

  return (
    <Container maxWidth="md" sx={{ display: 'flex' }}>
      <Grid container spacing={2} flex={1}>
        {isLoading && (
          <Grid container flex={1} justifyContent="center" sx={{ py: 5 }}>
            <CircularProgress />
          </Grid>
        )}
        {articles.map((article) => (
          <Article key={article._id} {...article} />
        ))}
      </Grid>
      <Sidebar />
    </Container>
  );
}
