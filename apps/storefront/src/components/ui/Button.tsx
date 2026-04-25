import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#D4FF3F] text-black hover:bg-white': variant === 'primary',
            'border border-[#1F1F1F] bg-transparent text-white hover:border-[#D4FF3F] hover:text-[#D4FF3F]': variant === 'outline',
            'bg-transparent text-gray-400 hover:text-white': variant === 'ghost',
          },
          {
            'px-4 py-2 text-[10px]': size === 'sm',
            'px-6 py-3 text-xs': size === 'md',
            'px-8 py-4 text-sm': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
