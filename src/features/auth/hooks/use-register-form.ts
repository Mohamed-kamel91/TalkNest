import { useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/config/paths';
import { useRegister } from '@/lib/api/auth';
import { useZodForm } from '@/lib/hooks/use-zod-form';

import { defaultRegisterValues } from '../constants';
import { registerFormSchema, type RegisterInput } from '../types';

export const UseRegisterForm = () => {
  const registerUser = useRegister();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo =
    searchParams.get('redirectTo') || paths.app.root.getHref();

  const form = useZodForm(registerFormSchema, {
    defaultValues: defaultRegisterValues,
    initialFocus: 'firstName',
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser.mutate(data, {
      onSuccess: () => navigate(redirectTo, { replace: true }),
    });
  };

  return {
    ...form,
    registerUser,
    redirectTo,
    onSubmit,
  };
};
