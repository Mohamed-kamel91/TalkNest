import { Link } from 'react-router';

import { ErrorAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, Form, Input } from '@/components/ui/form';
import { Stack } from '@/components/ui/stack';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/error-utils';

import { UseRegisterForm } from '../hooks/use-register-form';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const {
    registerUser,
    formState,
    redirectTo,
    register,
    handleSubmit,
    onSubmit,
  } = UseRegisterForm();

  return (
    <>
      <Form
        className={cn(className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        {registerUser.error && (
          <ErrorAlert
            title={getErrorMessage(registerUser.error)}
            testId="auth-form-error"
          />
        )}

        <Stack direction="col" gap={6}>
          <Field
            id="first-name"
            label="First name"
            error={formState.errors.firstName}
          >
            <Input type="text" {...register('firstName')} />
          </Field>
          <Field
            id="last-name"
            label="Last name"
            error={formState.errors.lastName}
          >
            <Input type="text" {...register('lastName')} />
          </Field>
          <Field
            id="email"
            label="Email"
            error={formState.errors.email}
          >
            <Input type="email" {...register('email')} />
          </Field>
          <Field
            id="password"
            label="Password"
            error={formState.errors.password}
          >
            <Input type="password" {...register('password')} />
          </Field>
          <Button
            type="submit"
            className="w-full"
            isLoading={registerUser.isPending}
          >
            Sign up
          </Button>
        </Stack>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </Form>
    </>
  );
}
