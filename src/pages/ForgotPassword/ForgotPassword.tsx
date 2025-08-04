import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import AuthLayout from 'src/layouts/AuthLayout';

const loginSchema = z.object({
  email: z.email('Email must be valid'),
});

export default function ForgotPassword() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <AuthLayout
      title="Forgot Password"
      footerText="Remember password?"
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
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="medium"
            sx={{ mt: 1, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </FormProvider>
    </AuthLayout>
  );
}
