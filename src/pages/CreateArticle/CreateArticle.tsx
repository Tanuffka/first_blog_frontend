import { Button } from '@mui/material';

import { useCreateArticle } from './useCreateArticle';

export default function CreateArticle() {
  const { createArticle } = useCreateArticle();

  const handleClick = () => {
    createArticle({
      title: 'Article 001',
      content: 'Article content',
    });
  };

  return (
    <div>
      I am creating article
      <Button onClick={handleClick}>Create</Button>
    </div>
  );
}
