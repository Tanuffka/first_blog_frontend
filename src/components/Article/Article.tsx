import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { getAcronyms, getFullname } from 'src/utils/helpers/user';
import { type ArticleApiResponseSchema } from 'src/shared/api';

import ArticleDate from './ArticleDate';

type ArticleProps = ArticleApiResponseSchema;

export default function Article({
  title,
  content,
  author,
  createdAt,
}: ArticleProps) {
  return (
    <Card variant="outlined">
      <Box
        sx={{
          height: '200px',
          img: { width: '100%', height: '100%', objectFit: 'cover' },
        }}
      >
        <img src="src/assets/placeholder-image.png" alt="placeholder image" />
      </Box>
      <CardContent sx={{ p: 4, pb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pr: 1 }}>
            <MuiAvatar
              alt={getAcronyms(author.firstname, author.lastname)}
              src="/static/images/avatar/2.jpg"
            />
          </Box>
          <Box>
            <Typography>
              {getFullname(author.firstname, author.lastname)}
            </Typography>
            <ArticleDate createdAt={createdAt} />
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
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
