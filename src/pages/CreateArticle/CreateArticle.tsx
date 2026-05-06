import { useState } from 'react';
import type { Area } from 'react-easy-crop';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import ContentLayout from 'src/layouts/ContentLayout';
import { useCreateArticle } from 'src/hooks/useCreateArticle';
import TextEditor from 'src/components/TextEditor';
import ArticleCover from 'src/components/ArticleCover';
import { articleSchema } from 'src/shared/zod/article';
import { useRequestFileUploadURL } from 'src/hooks/useRequestFileUploadURL.ts';
import { getCroppedImageFromFile } from 'src/utils/helpers/image.ts';

export default function CreateArticle() {
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const form = useForm({
    defaultValues: {
      title: '',
      content: ['', 0] as const,
      tags: [],
      coverImage: '',
    },
    resolver: zodResolver(articleSchema),
  });

  const {
    createArticle,
    isPending: isCreating,
    errorMessages,
  } = useCreateArticle();

  const { requestFileUploadURL } = useRequestFileUploadURL();

  const onSubmit = form.handleSubmit(async ({ title, content, tags }) => {
    try {
      let generatedCoverImageFileKey = null;

      if (coverImageFile && croppedAreaPixels) {
        const temporaryFileKey = `articles/${coverImageFile.name}`;

        const croppedImage = await getCroppedImageFromFile(
          coverImageFile,
          croppedAreaPixels,
        );

        const requestedFileUploadUrl = await requestFileUploadURL({
          fileKey: temporaryFileKey,
        });

        const { fileKey, fileUploadUrl } = requestedFileUploadUrl.data;

        generatedCoverImageFileKey = fileKey;

        await fetch(fileUploadUrl, {
          method: 'PUT',
          body: croppedImage,
        });
      }

      createArticle({
        title,
        content: content[0],
        tags,
        coverImage: generatedCoverImageFileKey,
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleCoverImageFileSelect = (file: File | null) => {
    setCoverImageFile(file);
  };

  const handleCropComplete = (croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

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
        <ArticleCover
          coverWidth={852}
          coverHeight={400}
          onFileSelect={handleCoverImageFileSelect}
          onCropComplete={handleCropComplete}
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
              name="tags"
              control={form.control}
              render={({ field, formState: { errors } }) => (
                <Autocomplete
                  content={field.value[0]}
                  multiple
                  freeSolo
                  options={[]}
                  onChange={(_event, value) => {
                    field.onChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.tags}
                      helperText={errors.tags?.message}
                      placeholder="Tags"
                    />
                  )}
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
    </ContentLayout>
  );
}
