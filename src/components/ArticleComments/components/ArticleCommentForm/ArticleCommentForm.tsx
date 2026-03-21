import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useCreateComment } from 'src/hooks/useCreateComment';
import { commentSchema } from 'src/shared/zod/comment';

const CONTENT_MAX_LENGTH = 200;

export default function ArticleCommentForm() {
  const { id } = useParams<{ id: string }>();
  const form = useForm({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(commentSchema),
  });

  const { createComment, isPending: isCreating } = useCreateComment(id!);

  const onSubmit = form.handleSubmit(({ content }) => {
    createComment(content);
    form.reset();
  });

  return (
    <Grid
      noValidate
      container
      component="form"
      autoComplete="off"
      flexDirection="column"
      sx={{ width: '100%' }}
      onSubmit={onSubmit}
    >
      <Controller
        name="content"
        control={form.control}
        rules={{ required: true, maxLength: CONTENT_MAX_LENGTH }}
        render={({ field: { onChange, ...field } }) => (
          <>
            <TextField
              multiline
              maxRows={4}
              placeholder="Type your message..."
              {...field}
              helperText={`${field.value.length} / ${CONTENT_MAX_LENGTH}`}
              onChange={(event) => {
                if (event.target.value.length > CONTENT_MAX_LENGTH) {
                  return;
                }
                onChange(event);
              }}
            />
          </>
        )}
      />
      <Grid container justifyContent={'right'}>
        <Button
          fullWidth
          loading={isCreating}
          type="submit"
          variant="contained"
          size="medium"
          sx={{ maxWidth: 150 }}
        >
          Add comment
        </Button>
      </Grid>
    </Grid>
  );
}
