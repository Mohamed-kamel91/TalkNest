import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {
  useForm,
  type FieldPath,
  type UseFormProps,
} from 'react-hook-form';
import { z, type ZodType } from 'zod';

export const useZodForm = <TSchema extends ZodType<any, any, any>>(
  schema: TSchema,
  options: Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> & {
    intialFocus?: FieldPath<z.infer<TSchema>>;
  } = {},
) => {
  const { intialFocus, ...formOptions } = options;

  const form = useForm({
    ...formOptions,
    resolver: zodResolver(schema) as any,
  });

  const { setFocus } = form;

  React.useEffect(() => {
    if (intialFocus) setFocus(intialFocus);
  }, [intialFocus, setFocus]);

  return { ...form };
};
