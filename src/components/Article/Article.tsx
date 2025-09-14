import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { getAcronyms, getFullName } from 'src/utils/helpers/user';
import { type ArticleApiResponseSchema } from 'src/shared/api';
import Date from 'src/components/Date';

type ArticleProps = ArticleApiResponseSchema;

export default function Article({
  _id,
  title,
  content,
  author,
  createdAt,
}: ArticleProps) {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          height: '200px',
          img: { width: '100%', height: '100%', objectFit: 'cover' },
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
        <img src="/images/image-placeholder.png" alt="image placeholder" />
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
