import { useEffect, useState } from 'react';
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
import { useRequestFileUploadURL } from 'src/hooks/useRequestFileUploadURL';
import { useRequestFileDownloadURL } from 'src/hooks/useRequestFileDownloadURL';
import ContentLayout from 'src/layouts/ContentLayout';
import TextEditor from 'src/components/TextEditor';
import ArticleCover from 'src/components/ArticleCover';
import { articleSchema } from 'src/shared/zod/article';

const ARTICLE_FORM_DEFAULT_VALUES = {
  title: '',
  content: ['', 0] as const,
  tags: [],
  coverCroppedImage: {
    fileKey: '',
    fileDownloadUrl: '',
  },
  coverImage: {
    fileKey: '',
    fileDownloadUrl: '',
    cropOptions: {
      x: 0,
      y: 0,
      width: 852,
      height: 400,
      zoom: 1,
    },
  },
} as const;

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const { data: article, isLoading } = useFetchArticle(id!);
  const {
    updateArticle,
    isPending: isUpdating,
    errorMessages,
  } = useUpdateArticle(id!);

  const { requestFileUploadURL } = useRequestFileUploadURL();
  const { requestFileDownloadURL } = useRequestFileDownloadURL();

  const form = useForm({
    defaultValues: {
      ...ARTICLE_FORM_DEFAULT_VALUES,
    },
    resolver: zodResolver(articleSchema),
  });

  const { reset, watch } = form;

  console.log(watch('coverImage'));

  const handleSubmit = form.handleSubmit(
    async ({ title, content, tags, coverImage, coverCroppedImage }) => {
      try {
        let generatedFileKey = coverImage.fileKey;
        let fileDownloadUrl = coverImage.fileDownloadUrl;

        if (coverImageFile) {
          const temporaryFileKey = `articles/${coverImageFile.name}`;

          const requestedFileUploadUrl = await requestFileUploadURL({
            fileKey: temporaryFileKey,
          });

          const { fileKey, fileUploadUrl } = requestedFileUploadUrl.data;

          await fetch(fileUploadUrl, {
            method: 'PUT',
            body: coverImageFile,
          });

          const requestedFileDownloadUrl = await requestFileDownloadURL({
            fileKey,
          });

          generatedFileKey = fileKey;
          fileDownloadUrl = requestedFileDownloadUrl.data || '';
        }

        updateArticle({
          title,
          content: content[0],
          tags,
          coverImage: {
            ...coverImage,
            fileKey: generatedFileKey,
            fileDownloadUrl,
          },
          coverCroppedImage,
        });
      } catch (error) {
        console.error(error);
      }
    },
  );

  const handleCancel = () => {
    navigate(`/articles/${id}`);
  };

  const handleCoverImageFileSelect = (file: File | null) => {
    setCoverImageFile(file);
  };

  useEffect(() => {
    if (!article) {
      return;
    }

    reset({
      ...ARTICLE_FORM_DEFAULT_VALUES,
      title: article.title,
      content: [article.content, article.content.length],
      tags: article.tags,
      coverImage: article.coverImage,
      coverCroppedImage: article.coverCroppedImage,
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
        <Controller
          name="coverImage"
          control={form.control}
          render={({ field }) => (
            <ArticleCover
              cover={field.value}
              onChange={field.onChange}
              onFileSelect={handleCoverImageFileSelect}
            />
          )}
        />
      </Grid>
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
            onSubmit={handleSubmit}
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
              <Typography
                key={index}
                fontWeight={600}
                color="red"
                component="p"
              >
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
