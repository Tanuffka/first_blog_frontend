import { useCallback, useState, type ChangeEvent } from 'react';
import {
  Container,
  Grid,
  CircularProgress,
  Pagination,
  Box,
} from '@mui/material';
import Article from 'src/components/Article';
import ArticleSearch from 'src/components/ArticleFilter/components';
import {
  useSearchArticle,
  type FilterApiResponseSchema,
} from 'src/hooks/useSearchArticle';

export default function Home() {
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useState<
    Omit<FilterApiResponseSchema, 'order' | 'page' | 'limit'>
  >({
    searchByTitle: true,
  });

  const { data: { data: articles = [] } = { data: [] }, isLoading } =
    useSearchArticle({
      order,
      page,
      limit: 5,
      ...searchParams,
    });

  const handleSearchChange = useCallback(
    (incomingFilters: FilterApiResponseSchema) => {
      if (incomingFilters.order) {
        setOrder(incomingFilters.order);
      }

      setSearchParams({
        searchKeyword: incomingFilters.searchKeyword,
        searchByTitle: incomingFilters.searchByTitle,
        tags: incomingFilters.tags,
        author: incomingFilters.author,
      });
      setPage(1);
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
        {isLoading ? (
          <Grid container flex={1} justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          articles.map((article) => <Article key={article._id} {...article} />)
        )}
      </Grid>

      <Box display="flex" justifyContent="center" my={4}>
        <Pagination
          count={5}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
}
