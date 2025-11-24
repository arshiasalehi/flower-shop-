import { cloneElement, forwardRef, isValidElement } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth, asChild, children, type = 'button', ...props }, ref) => {
    const classes = clsx(
      'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      {
        primary: 'bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand',
        secondary:
          'bg-white text-brand border border-brand/30 hover:border-brand focus-visible:outline-brand',
        ghost: 'text-brand hover:bg-brand-light focus-visible:outline-brand'
      }[variant],
      fullWidth && 'w-full',
      className
    );

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement;
      return cloneElement(child, {
        className: clsx(child.props.className, classes)
      });
    }

    return (
      <button ref={ref} className={classes} type={type} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
