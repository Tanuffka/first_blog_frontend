import { useEffect, useState } from 'react';

import { Controller, FormProvider, useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ContentLayout from 'src/layouts/ContentLayout';
import { useFetchMe } from 'src/hooks/useFetchMe';
import { useUpdateUser } from 'src/hooks/useUpdateUser';

import AvatarContainer from './components/AvatarContainer';

export default function UserProfile() {
  const [isEditable, setIsEditable] = useState(false);

  const { data: currentUser } = useFetchMe();

  const {
    updateUser,
    isPending: isUpdating,
    errorMessages,
  } = useUpdateUser(currentUser?._id);

  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      bio: '',
    },
  });

  const { reset } = form;

  const onSubmit = form.handleSubmit((data) => {
    updateUser(data).then(() => {
      setIsEditable(false);
    });
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    reset({
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      bio: currentUser.bio || '',
    });
  }, [currentUser, reset]);

  if (!currentUser) {
    return null;
  }

  return (
    <ContentLayout
      sidebar={<AvatarContainer />}
      title={`Profile: ${currentUser.firstname} ${currentUser.lastname}`}
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
            name="firstname"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                disabled={!isEditable}
                variant="outlined"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
                {...field}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        Firstname:
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Controller
            name="lastname"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                disabled={!isEditable}
                variant="outlined"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                {...field}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        Lastname:
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Controller
            name="bio"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                multiline
                disabled={!isEditable}
                rows={4}
                variant="outlined"
                error={!!errors.bio}
                helperText={errors.bio?.message}
                {...field}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: 'start' }}
                      >
                        BIO:{' '}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          {errorMessages?.map((message, index) => (
            <Typography key={index} fontWeight={600} color="red" component="p">
              {message}
            </Typography>
          ))}
          {!isEditable && (
            <Grid container justifyContent="flex-end">
              <Button
                fullWidth
                variant="contained"
                size="medium"
                sx={{ maxWidth: 200 }}
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </Grid>
          )}
          {isEditable && (
            <Grid display="flex" justifyContent="space-between">
              <Button
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  maxWidth: 200,
                }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                loading={isUpdating}
                type="submit"
                variant="contained"
                size="medium"
                sx={{
                  maxWidth: 200,
                }}
              >
                Update
              </Button>
            </Grid>
          )}
        </Grid>
      </FormProvider>
    </ContentLayout>
  );
}
