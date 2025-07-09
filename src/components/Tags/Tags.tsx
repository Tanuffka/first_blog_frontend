import { CardContent, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import TagIcon from '@mui/icons-material/Tag';

export default function Tags() {
  return (
    <MuiCard variant="outlined" sx={{ height: '242px', width: '300px', mb: 2 }}>
      <CardContent>
        <Typography
          variant="body1"
          sx={{ pb: 1, fontSize: '18px', fontWeight: 'normal' }}
        >
          Tags
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
          }}
        >
          <TagIcon />
          Lorem ipsum dolor
        </Typography>
      </CardContent>
    </MuiCard>
  );
}
