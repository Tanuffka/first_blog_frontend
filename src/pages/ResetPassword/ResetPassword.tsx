import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import AuthLayout from 'src/layouts/AuthLayout';
import InputPassword from 'src/components/InputPassword';

const loginSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match',
  });

export default function ResetPassword() {
  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
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
            name="password"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                fullWidth
                required
                label="Password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
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
            name="confirmPassword"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <InputPassword
                fullWidth
                required
                label="Confirm password"
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
