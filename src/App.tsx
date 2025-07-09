import { BrowserRouter } from 'react-router';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Router from './Router';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const theme = useTheme();
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <CssBaseline />
        <Header />
        <Router />
      </Box>
    </BrowserRouter>
  );
}

export default App;
