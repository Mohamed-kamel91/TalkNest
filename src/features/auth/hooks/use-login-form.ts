import { useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/config/paths';
import { useLogin } from '@/lib/api/auth';
import { useZodForm } from '@/lib/hooks/use-zod-form';

import { defaultLoginValues } from '../constants';
import { loginFormSchema, type LoginInput } from '../types';

export const useLoginForm = () => {
  const login = useLogin();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectTo =
    searchParams.get('redirectTo') || paths.app.root.getHref();

  const form = useZodForm(loginFormSchema, {
    defaultValues: defaultLoginValues,
    initialFocus: 'email',
  });

  const onSubmit = (data: LoginInput) => {
    login.mutate(data, {
      onSuccess: () => {
        navigate(redirectTo, {
          state: { from: redirectTo },
          replace: true,
        });
      },
    });
  };

  return {
    login,
    redirectTo,
    ...form,
    onSubmit,
  };
};
