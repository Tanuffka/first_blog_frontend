import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { type TagsApiResponseSchema } from 'src/shared/api/schema';

interface TagsProps {
  tags?: TagsApiResponseSchema['tags'];
}

export default function Tags({ tags = [] }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <Box sx={{ marginY: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {tags.map((tag) => (
          <Chip key={tag.name} label={tag.name} variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}
