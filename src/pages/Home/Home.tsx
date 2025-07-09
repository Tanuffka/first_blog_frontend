import { Container } from '@mui/material';

import Post from 'src/components/Post';
import Sidebar from 'src/components/Sidebar';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex' }}>
      <Post />
      <Sidebar />
    </Container>
  );
}
