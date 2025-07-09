import Box from '@mui/material/Box';

import Tags from '../Tags';
import Comments from '../Comments/Comments';

export default function Sidebar() {
  return (
    <Box sx={{ pl: 5 }}>
      <Tags />
      <Comments />
    </Box>
  );
}
