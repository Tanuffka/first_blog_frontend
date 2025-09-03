import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteArticle } from 'src/hooks/useDeleteArticle';

interface ButtonDeleteArticleProps {
  id: string;
}

export default function ButtonDeleteArticle({ id }: ButtonDeleteArticleProps) {
  const [open, setOpen] = useState(false);

  const { deleteArticle, isPending } = useDeleteArticle(id!);

  const handleDelete = () => {
    deleteArticle();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{
          borderWidth: 2,
          fontWeight: 800,
        }}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" loading={isPending} onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
