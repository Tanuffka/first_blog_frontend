import { Link } from 'react-router-dom';

import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Date from 'src/components/PostingDate';
import TextEditor from 'src/components/TextEditor';
import { type ArticleApiResponseSchema } from 'src/shared/api';
import { getPublicFileURL } from 'src/utils/helpers/s3.ts';
import { getAcronyms, getFullName } from 'src/utils/helpers/user';

import Tags from './components/Tags';

type ArticleProps = ArticleApiResponseSchema;

export default function Article({
  _id,
  author,
  content,
  coverImage,
  createdAt,
  tags,
  title,
}: ArticleProps) {
  const userAcronyms = getAcronyms(author.firstname, author.lastname);

  const articleCoverImageURL = getPublicFileURL(coverImage);

  return (
    <Card variant="outlined" data-testid="article" sx={{ width: '100%' }}>
      <Box
        sx={{
          backgroundColor: 'grey',
          backgroundImage: 'url(/images/image-placeholder.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: 400,
          position: 'relative',
          img: {
            height: '100%',
            objectFit: 'cover',
            width: '100%',
          },
        }}
      >
        <Button
          size="small"
          type="submit"
          component={Link}
          variant="outlined"
          to={`articles/${_id}`}
          sx={{
            borderWidth: 2,
            fontWeight: 800,
            position: 'absolute',
            right: 15,
            top: 15,
          }}
        >
          View
        </Button>
        {articleCoverImageURL && (
          <img alt="article cover" src={articleCoverImageURL} />
        )}
      </Box>
      <CardContent sx={{ p: 4, pb: 6 }}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
                variant="h6"
                sx={{
                  fontWeight: '600',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Typography>
            </Box>
          </Tooltip>
          <Box
            sx={{
              display: '-webkit-box',
              lineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            <TextEditor isPlainText editable={false} content={content} />
          </Box>
          <Tags tags={tags} />
        </Box>
      </CardContent>
    </Card>
  );
}
