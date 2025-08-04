import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AuthLayout from 'src/layouts/AuthLayout';
import InputPassword from 'src/components/InputPassword';

import { useLogin } from '../../hooks/useLogin';

const loginSchema = z.object({
  email: z.email('Email must be valid'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { errorMessages, isPending, login } = useLogin();

  const onSubmit = form.handleSubmit(login);

  return (
    <AuthLayout
      title="Login"
      footerText="Dont have an account?"
      footerLink={{ to: '/register', content: 'Register' }}
    >
      <FormProvider {...form}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            px: 6,
          }}
          onSubmit={onSubmit}
        >
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
            disabled={isPending}
            type="submit"
            variant="contained"
            size="medium"
            sx={{ mt: 1, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </FormProvider>
    </AuthLayout>
  );
}
