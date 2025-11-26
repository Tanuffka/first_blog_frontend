import { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useFetchArticle } from 'src/hooks/useFetchArticle';
import { useUpdateArticle } from 'src/hooks/useUpdateArticle';
import ContentLayout from 'src/layouts/ContentLayout';
import TextEditor from 'src/components/TextEditor';
import ArticleCover from 'src/components/ArticleCover';
import { articleSchema } from 'src/shared/zod/article';

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: article, isLoading } = useFetchArticle(id!);
  const {
    updateArticle,
    isPending: isUpdating,
    errorMessages,
  } = useUpdateArticle(id!);

  const form = useForm({
    defaultValues: {
      title: '',
      content: ['', 0] as const,
    },
    resolver: zodResolver(articleSchema),
  });

  const { reset } = form;

  const onSubmit = form.handleSubmit(({ title, content }) => {
    updateArticle({ title, content: content[0] });
  });

  const handleCancel = () => {
    navigate(`/articles/${id}`);
  };

  useEffect(() => {
    if (!article) {
      return;
    }

    reset({
      title: article.title,
      content: [article.content, article.content.length],
    });
  }, [article, reset]);

  return (
    <ContentLayout title="Edit article">
       <Grid
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
          <ArticleCover/>
      </Grid>
      <Grid   sx={{
          width: '100%',
          height: '100%',
          padding: 6,
        }}>
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
                placeholder="Content"
                content={field.value[0]}
                error={errors.content?.[1]?.message}
                onChange={field.onChange}
              />
            )}
          />
          {errorMessages?.map((message, index) => (
            <Typography key={index} fontWeight={600} color="red" component="p">
              {message}
            </Typography>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                maxWidth: 200,
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              loading={isLoading || isUpdating}
              type="submit"
              variant="contained"
              sx={{
                maxWidth: 200,
              }}
            >
              Update
            </Button>
          </Box>
        </Grid>
      </FormProvider>
      </Grid>
    </ContentLayout>
  );
}
