import { DevTool } from '@hookform/devtools';
import { FeatherIcon } from 'lucide-react';
import { Controller, useWatch, type Control } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldErrorText,
  Form,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui/form';
import { Stack } from '@/components/ui/stack';
import { cn } from '@/lib/utils/cn';

import { TOPICS } from '../constants';
import { useCreatPostForm } from '../hooks/use-create-post-form';

import type { CreatePostInput } from '../types';

export const CreatePost = ({
  className,
}: React.ComponentProps<'form'>) => {
  const {
    createPost,
    formState,
    onSubmit,
    register,
    control,
    handleSubmit,
  } = useCreatPostForm();

  return (
    <>
      <Form
        className={cn(className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Topic select */}
        <Controller
          control={control}
          name="topic"
          render={({ field }) => (
            <Stack direction="col">
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={field.onBlur}
              >
                <SelectTrigger
                  className="bg-secondary hover:bg-secondary/80 border-0"
                  aria-invalid={!!formState.errors.topic}
                >
                  {!field.value && <FeatherIcon />}
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <SelectItem
                        key={topic.value}
                        value={topic.value}
                      >
                        <Icon />
                        {topic.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FieldErrorText
                errorText={formState.errors.topic?.message}
              />
            </Stack>
          )}
        />

        {/* Title input */}
        <Stack direction="col">
          <Field id="post-title" label="Title">
            <Input
              className="h-14 rounded-xl px-4 py-3 md:text-base"
              type="text"
              placeholder="Post title"
              autoComplete="off"
              aria-invalid={!!formState.errors.title}
              aria-describedby="post-title-error"
              maxLength={100}
              {...register('title')}
            />
          </Field>
          <Stack className={cn('text-muted-foreground text-xs')}>
            <FieldErrorText
              id="post-title-error"
              errorText={formState.errors.title?.message}
            />
            <TitleCharacterCount control={control} />
          </Stack>
        </Stack>

        {/* Content input */}
        <Field
          id="post-content"
          label="Body"
          error={formState.errors.content}
        >
          <Textarea
            className="rounded-xl px-4 py-3 md:text-base"
            autoComplete="off"
            placeholder="Write your content here..."
            {...register('content')}
          />
        </Field>

        <Stack align="center" className="ms-auto">
          <Button
            type="submit"
            size="lg"
            radius="circle"
            isLoading={createPost.isPending}
          >
            Post
          </Button>
        </Stack>
      </Form>

      {/* Render the DevTool and pass the control prop */}
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={control} />
      )}
    </>
  );
};

const TitleCharacterCount = ({
  control,
}: {
  control: Control<CreatePostInput>;
}) => {
  const title = useWatch({
    control,
    name: 'title',
  });

  return <span className="ms-auto">{`${title.length}/100`}</span>;
};
