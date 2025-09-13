type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractParams<`/${Rest}`>]: string }
    : T extends `${string}:${infer Param}`
      ? { [k in Param]: string }
      : Record<string, never>;

export const createPath = <TPath extends string>(path: TPath) => ({
  path,
  getHref: (params?: ExtractParams<TPath>) => {
    if (!params) return path;

    let pathName = path as string;
    Object.entries(params).forEach(([key, value]) => {
      pathName = pathName.replace(
        `:${key}`,
        encodeURIComponent(value),
      );
    });

    return pathName;
  },
});

export const createAuthPath = (path: string) => ({
  path,
  getHref: (redirectTo?: string | null | undefined) => {
    const redirectToQuery = redirectTo
      ? `?redirectTo=${encodeURIComponent(redirectTo)}`
      : '';
    return `${path}${redirectToQuery}`;
  },
});
