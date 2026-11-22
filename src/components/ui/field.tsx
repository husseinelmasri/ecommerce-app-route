import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 'data-invalid'?: boolean }
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-2',
        props['data-invalid'] && 'text-destructive',
        className,
      )}
      {...props}
    />
  );
});
Field.displayName = 'Field';

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn('peer-data-[invalid=true]:text-destructive', className)}
      {...props}
    />
  );
});
FieldLabel.displayName = 'FieldLabel';

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    errors?: Array<{ message?: string } | undefined>;
  }
>(({ className, errors, ...props }, ref) => {
  const error = errors?.find((e) => e?.message);
  if (!error) return null;

  return (
    <p
      ref={ref}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...props}>
      {error.message}
    </p>
  );
});
FieldError.displayName = 'FieldError';

export { Field, FieldLabel, FieldDescription, FieldError };
