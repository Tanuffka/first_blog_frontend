import { Link, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { getAcronyms, getFullName } from 'src/utils/helpers/user';
import { type ArticleApiResponseSchema } from 'src/shared/api';
import Date from 'src/components/PostingDate';
import TextEditor from 'src/components/TextEditor';
import { getPublicFileURL } from 'src/utils/helpers/s3.ts';
import { useFetchMe } from 'src/hooks/useFetchMe';
import { useFetchArticle } from 'src/hooks/useFetchArticle';
import { useSession } from 'src/stores/useSession';

type ArticleProps = ArticleApiResponseSchema;

export default function Article({
  _id,
  title,
  content,
  author,
  coverImage,
  createdAt,
}: ArticleProps) {
  const { id } = useParams<{ id: string }>();
  const { data: article } = useFetchArticle(id!);
  const { data: currentUser } = useFetchMe();

  const { isAuthenticated } = useSession();
  
  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const userAcronyms = getAcronyms(currentUser.firstname, currentUser.lastname);

  const articleCoverImageURL = getPublicFileURL(coverImage);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          height: '400px',
          backgroundColor: 'grey',
          backgroundImage: 'url(/images/image-placeholder.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <Button
          component={Link}
          to={`articles/${_id}`}
          variant="outlined"
          size="small"
          type="submit"
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            borderWidth: 2,
            fontWeight: 800,
          }}
        >
          View
        </Button>
        {articleCoverImageURL && (
          <img src={articleCoverImageURL} alt="article cover" />
        )}
      </Box>
      <CardContent sx={{ p: 4, pb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pr: 1 }}>
            <MuiAvatar alt={userAcronyms} src={author.avatarUrl} />
          </Box>

          <Box>
            <Typography>
              {getFullName(author.firstname, author.lastname)}
            </Typography>
            <Date createdAt={createdAt} />
          </Box>
        </Box>
        <Box sx={{ mt: 2, width: '100%' }}>
          <Tooltip arrow title={title} placement="top">
            <Box position="relative">
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
                variant="h6"
              >
                {title}
              </Typography>
            </Box>
          </Tooltip>
          <Box
            sx={{
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            <TextEditor isPlainText editable={false} content={content} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
