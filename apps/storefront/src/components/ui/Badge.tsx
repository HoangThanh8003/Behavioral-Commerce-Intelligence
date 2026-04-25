import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest',
        {
          'border border-[#1F1F1F] text-gray-400': variant === 'default',
          'bg-[#D4FF3F] text-black': variant === 'accent',
          'bg-[#121212] text-gray-500': variant === 'muted',
        },
        className,
      )}
    >
      {children}
    </span>
  );
};
