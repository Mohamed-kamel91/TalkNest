import {
  QueryClient,
  type DefaultOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 6, // 1 minute
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type ApiFnReturnType<
  FnType extends (...args: any) => Promise<any>,
> = Awaited<ReturnType<FnType>>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
