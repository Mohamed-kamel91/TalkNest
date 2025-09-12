import React, { useId } from 'react';

import { cn } from '@/lib/utils/cn';

import { FieldErrorText } from './field-error-text';
import { Label } from './label';
import { Stack } from '../stack';

import type { Input } from './input';
import type { FieldError } from 'react-hook-form';

type FieldElement = React.ReactElement<
  | React.ComponentProps<typeof Input | 'input'>
  | React.ComponentProps<'textarea'>
  | React.ComponentProps<'select'>
>;

type FieldProps = {
  id?: string;
  className?: string;
  label: string;
  error?: FieldError | undefined;
  children: FieldElement;
};

export const Field = ({
  id,
  className,
  label,
  error,
  children,
}: FieldProps) => {
  const generatedId = useId();

  const inputId = children.props.id || id || `${generatedId}-input`;
  const errorId = `${inputId}-error`;

  return (
    <Stack direction="col" gap={2} className={cn(className)}>
      <Label htmlFor={inputId}>{label}</Label>

      {React.cloneElement(children, {
        ...children.props,
        id: inputId,
        'aria-invalid': children.props['aria-invalid'] || !!error,
        'aria-describedby': [
          children.props['aria-describedby'],
          error ? errorId : null,
        ]
          .filter(Boolean)
          .join(' '),
      })}

      <FieldErrorText id={errorId} errorText={error?.message} />
    </Stack>
  );
};
