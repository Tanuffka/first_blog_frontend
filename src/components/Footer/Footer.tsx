import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { alpha, colors } from '@mui/material';

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        py: 5,
        mt: 5,
        borderWidth: 1,
        borderTopStyle: 'dashed',
        borderColor: alpha('#000000', 0.12),
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" color={colors.grey[500]}>
        Made by Tanyffka, 2025
      </Typography>
    </Grid>
  );
}
