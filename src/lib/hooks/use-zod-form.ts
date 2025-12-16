import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import {
  useForm,
  type FieldPath,
  type UseFormProps,
} from 'react-hook-form';
import { z, type ZodType } from 'zod';

type UseZodFormOptions<TSchema extends ZodType<any, any, any>> = Omit<
  UseFormProps<z.infer<TSchema>>,
  'resolver'
> & {
  initialFocus?: FieldPath<z.infer<TSchema>>;
};

export const useZodForm = <TSchema extends ZodType<any, any, any>>(
  schema: TSchema,
  options: UseZodFormOptions<TSchema> = {},
) => {
  const { initialFocus, ...formOptions } = options;

  const form = useForm({
    ...formOptions,
    resolver: zodResolver(schema) as any,
  });

  const { setFocus } = form;

  React.useEffect(() => {
    if (initialFocus) setFocus(initialFocus);
  }, [initialFocus, setFocus]);

  return form;
};
