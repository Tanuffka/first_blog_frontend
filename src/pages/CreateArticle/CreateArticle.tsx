import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ContentLayout from 'src/layouts/ContentLayout';
import { useCreateArticle } from 'src/hooks/useCreateArticle';

const articleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

export default function CreateArticle() {
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    resolver: zodResolver(articleSchema),
  });

  const {
    createArticle,
    isPending: isCreating,
    errorMessages,
  } = useCreateArticle();

  const onSubmit = form.handleSubmit((data) => {
    createArticle(data);
  });

  return (
    <ContentLayout title="Create article">
      <FormProvider {...form}>
        <Grid
          noValidate
          container
          component="form"
          autoComplete="off"
          flexDirection="column"
          spacing={2}
          sx={{ width: '100%' }}
          onSubmit={onSubmit}
        >
          <Controller
            name="title"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                label="Title"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="content"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                multiline
                label="Content"
                variant="outlined"
                rows={6}
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
              />
            )}
          />
          {errorMessages?.map((message, index) => (
            <Typography key={index} fontWeight={600} color="red" component="p">
              {message}
            </Typography>
          ))}
          <Grid container justifyContent="space-between">
            <Button
              fullWidth
              loading={isCreating}
              type="submit"
              variant="contained"
              size="medium"
              sx={{ maxWidth: 200 }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </ContentLayout>
  );
}
