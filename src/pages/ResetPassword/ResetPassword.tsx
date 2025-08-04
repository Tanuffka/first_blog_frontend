import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import AuthLayout from 'src/layouts/AuthLayout';
import InputPassword from 'src/components/InputPassword';

const loginSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Password does not match',
  });

export default function ResetPassword() {
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <AuthLayout
      title="Reset Password"
      footerText="Already have an account?"
      footerLink={{ to: '/login', content: 'Login' }}
    >
      <FormProvider {...form}>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            px: 6,
          }}
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                fullWidth
                required
                label="Current Password"
                variant="outlined"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                type="password"
                sx={{ my: 1 }}
                {...field}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                fullWidth
                required
                label="New password"
                variant="outlined"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                type="password"
                sx={{ my: 1 }}
                {...field}
              />
            )}
          />
          <Controller
            name="confirmNewPassword"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                fullWidth
                required
                label="Confirm new password"
                variant="outlined"
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword?.message}
                type="password"
                sx={{ my: 1 }}
                {...field}
              />
            )}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="medium"
            sx={{ mt: 1, mb: 2 }}
          >
            Reset
          </Button>
        </Box>
      </FormProvider>
    </AuthLayout>
  );
}
