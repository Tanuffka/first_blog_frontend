import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import { useFetchMe } from 'src/hooks/useFetchMe';

import ButtonUploadAvatar from '../ButtonUploadAvatar';
import ButtonDeleteAvatar from '../ButtonDeleteAvatar';

export interface MutationReqData {
  file: File;
}

export default function AvatarContainer() {
  const theme = useTheme();

  const { data: currentUser } = useFetchMe();

  return (
    <Grid sx={{ width: 300 }}>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            width: 300 - 32,
            height: 300 - 32,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: 'url(/images/avatar-placeholder.png)',
            borderColor: grey[300],
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: theme.shape.borderRadius + 'px',
            overflow: 'hidden',
            img: {
              width: '100%',
              height: '100%',
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
            mt: 2,
            justifyContent: 'space-around',
          }}
        >
          <ButtonUploadAvatar />
          {currentUser?.avatarUrl && <ButtonDeleteAvatar />}
        </Grid>
      </Paper>
    </Grid>
  );
}
