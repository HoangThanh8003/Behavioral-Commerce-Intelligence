'use client';

import { useTheme } from '@/lib/theme-context';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-border/50 group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-xl group-[.toaster]:rounded-2xl',
          description: 'group-[.toast]:text-text-tertiary',
          actionButton:
            'group-[.toast]:bg-emerald group-[.toast]:text-canvas',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-text-tertiary',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
