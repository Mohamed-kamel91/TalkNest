export const Breadcrumb = ({
  ...props
}: React.ComponentProps<'nav'>) => {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
  );
};
