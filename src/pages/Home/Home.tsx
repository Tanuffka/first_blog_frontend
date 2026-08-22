import { useCallback, useState, type ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import Article from 'src/components/Article';
import ArticleSearch from 'src/components/ArticleFilter/components';
import {
  useSearchArticle,
  type UseSearchArticleParams,
  type ArticleSearchParams,
} from 'src/hooks/useSearchArticle';
import { SORT_ORDER } from 'src/shared/types/common';

export default function Home() {
  const [order, setOrder] = useState<SORT_ORDER>(SORT_ORDER.desc);
  const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useState<ArticleSearchParams>({
    searchByTitle: true,
    searchKeyword: '',
    tags: [],
  });

  const { data: { data: articles = [] } = { data: [] }, isLoading } =
    useSearchArticle({
      order,
      page,
      ...searchParams,
    });

  const handleSearchChange = useCallback(
    (incomingFilters: UseSearchArticleParams) => {
      if (incomingFilters.order) {
        setOrder(incomingFilters.order);
      }

      setSearchParams({
        author: incomingFilters.author,
        searchByTitle: incomingFilters.searchByTitle,
        searchKeyword: incomingFilters.searchKeyword,
        tags: incomingFilters.tags,
      });
    },
    [],
  );

  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <ArticleSearch onChange={handleSearchChange} />

      <Grid container spacing={2}>
        {isLoading && (
          <Grid container flex={1} alignItems="center" justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
        {articles?.map((article) => (
          <Article key={article._id} {...article} />
        ))}
      </Grid>

      <Box my={4} display="flex" justifyContent="center">
        <Pagination
          showLastButton
          showFirstButton
          count={5}
          page={page}
          defaultPage={0}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}
