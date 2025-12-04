import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ContentLayout from 'src/layouts/ContentLayout';
import { useCreateArticle } from 'src/hooks/useCreateArticle';
import TextEditor from 'src/components/TextEditor';
import ArticleCover from 'src/components/ArticleCover';
import { articleSchema } from 'src/shared/zod/article';

export default function CreateArticle() {
  const form = useForm({
    defaultValues: {
      title: '',
      content: ['', 0] as const,
      cover: {
        image: '',
        crop: {
          x: 0,
          y: 0,
        },
        zoom: 1,
      } as const,
    },
    resolver: zodResolver(articleSchema),
  });

  const {
    createArticle,
    isPending: isCreating,
    errorMessages,
  } = useCreateArticle();

  const onSubmit = form.handleSubmit(({ title, content }) => {
    createArticle({ title, content: content[0] });
  });

  return (
    <ContentLayout title="Create article">
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Controller
          name="cover"
          control={form.control}
          render={({ field }) => (
            <ArticleCover cover={field.value} onChange={field.onChange} />
          )}
        />
        <Grid />
        <Grid
          sx={{
            width: '100%',
            height: '100%',
            padding: 6,
          }}
        >
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
                  <TextEditor
                    content={field.value[0]}
                    placeholder="Content"
                    error={errors.content?.[1]?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              {errorMessages?.map((message, index) => (
                <Typography
                  key={index}
                  fontWeight={600}
                  color="red"
                  component="p"
                >
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
        </Grid>
      </Grid>
    </ContentLayout>
  );
}
