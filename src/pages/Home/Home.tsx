import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Article from 'src/components/Article';
import Sidebar from 'src/components/Sidebar';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex' }}>
      <Grid container spacing={1}>
        {new Array(4).fill(null).map((_, i) => (
          <Article key={i} />
        ))}
      </Grid>
      <Sidebar />
    </Container>
  );
}
