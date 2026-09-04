import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { type TagsApiResponseSchema } from 'src/shared/api/schema';

interface TagsProps {
  tags?: TagsApiResponseSchema['tags'];
}

export default function Tags({ tags = [] }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <Box sx={{ marginY: 2 }}>
      <Stack useFlexGap spacing={1} direction="row" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip key={tag.name} label={tag.name} variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}
