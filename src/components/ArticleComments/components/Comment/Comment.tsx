import { Box, Paper, Typography } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import type { CommentApiResponseSchema } from 'src/shared/api/schema';
import Date from 'src/components/PostingDate';
import { getAcronyms, getFullName } from 'src/utils/helpers/user';
import { useFetchMe } from 'src/hooks/useFetchMe';
import { useSession } from 'src/stores/useSession';

export default function Comment({
  content,
  createdAt,
  author,
}: CommentApiResponseSchema) {
  const { data: currentUser } = useFetchMe();
  
  const { isAuthenticated } = useSession();
  
  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const userAcronyms = getAcronyms(currentUser.firstname, currentUser.lastname);

  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        border: '1px',
      }}
    >
      <Box color="inherit" sx={{ display: 'flex' }}>
        <MuiAvatar alt={userAcronyms} src={currentUser.avatarUrl} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          marginLeft: 2,
        }}
      >
        <Box>
          <Typography>
            {getFullName(author.firstname, author.lastname)}
          </Typography>
          <Date createdAt={createdAt} />
        </Box>
        <Typography marginTop={1}>{content}</Typography>
      </Box>
    </Paper>
  );
}
