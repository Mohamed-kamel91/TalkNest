import { Link } from 'react-router';

import { ErrorAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Field } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { Stack } from '@/components/ui/stack/stack';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/error-utils';

import { UseLoginForm } from '../hooks/use-login-form';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const {
    login,
    formState,
    redirectTo,
    register,
    handleSubmit,
    onSubmit,
  } = UseLoginForm();

  return (
    <>
      <Form
        className={cn(className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        {login.error && (
          <ErrorAlert title={getErrorMessage(login.error)} />
        )}

        <Stack direction="col" gap={6}>
          <Field
            id="email"
            label="Email"
            error={formState.errors.email}
          >
            <Input
              type="email"
              autoComplete="email"
              {...register('email')}
            />
          </Field>
          <Field
            id="password"
            label="Password"
            error={formState.errors.password}
          >
            <Input
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
          </Field>
          <Button
            type="submit"
            className="w-full"
            isLoading={login.isPending}
          >
            Login
          </Button>
        </Stack>
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            className="underline underline-offset-4"
            to={paths.auth.register.getHref(redirectTo)}
          >
            Sign up
          </Link>
        </div>
      </Form>
    </>
  );
}
