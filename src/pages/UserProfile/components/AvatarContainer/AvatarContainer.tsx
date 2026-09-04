import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

import { useFetchMe } from 'src/hooks/useFetchMe';

import ButtonDeleteAvatar from '../ButtonDeleteAvatar';
import ButtonUploadAvatar from '../ButtonUploadAvatar';

export default function AvatarContainer() {
  const theme = useTheme();

  const { data: currentUser } = useFetchMe();

  return (
    <Grid sx={{ width: 300 }}>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            backgroundImage: 'url(/images/avatar-placeholder.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderColor: grey[300],
            borderRadius: theme.shape.borderRadius + 'px',
            borderStyle: 'solid',
            borderWidth: 1,
            height: 300 - 32,
            overflow: 'hidden',
            width: 300 - 32,
            img: {
              height: '100%',
              width: '100%',
            },
          }}
        >
          {currentUser && currentUser.avatarUrl && (
            <img src={currentUser.avatarUrl} alt={currentUser.firstname} />
          )}
        </Box>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            mt: 2,
          }}
        >
          <ButtonUploadAvatar />
          {currentUser?.avatarUrl && <ButtonDeleteAvatar />}
        </Grid>
      </Paper>
    </Grid>
  );
}
