import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AuthLayout from 'src/layouts/AuthLayout';
import InputPassword from 'src/components/InputPassword';

import { useRegister } from '../../hooks/useRegister';

const loginSchema = z
  .object({
    firstname: z.string().min(2, 'Username must be at least 2 characters'),
    lastname: z.string().min(2, 'Lastname must be at least 2 characters'),
    email: z.email('Email must be valid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function Register() {
  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { errorMessages, isPending, register } = useRegister();

  const onSubmit = form.handleSubmit(register);

  return (
    <AuthLayout
      title="Register"
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
            name="firstname"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                label="Firstname"
                variant="outlined"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
                sx={{ my: 1 }}
                {...field}
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
                label="Lastname"
                variant="outlined"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                sx={{ my: 1 }}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, formState: { errors } }) => (
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ my: 1 }}
                {...field}
              />
            )}
          />
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
          {errorMessages?.map((message, index) => (
            <Typography key={index} fontWeight={600} color="red" component="p">
              {message}
            </Typography>
          ))}
          <Button
            fullWidth
            loading={isPending}
            type="submit"
            variant="contained"
            size="medium"
            sx={{ mt: 1, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </FormProvider>
    </AuthLayout>
  );
}
