/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        canvas: 'hsl(var(--background) / <alpha-value>)',
        surface: 'hsl(var(--card) / <alpha-value>)',
        overlay: 'hsl(var(--popover) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        
        'text-primary': 'hsl(var(--foreground) / <alpha-value>)',
        'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',
        'text-tertiary': 'hsl(var(--text-tertiary) / <alpha-value>)',
        'text-disabled': 'hsl(var(--text-disabled) / <alpha-value>)',

        emerald: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          hover: 'hsl(var(--primary-hover) / <alpha-value>)',
          dim: 'hsl(var(--primary-dim) / <alpha-value>)',
          deep: 'hsl(var(--primary-deep) / <alpha-value>)',
          muted: 'hsl(var(--accent) / <alpha-value>)',
          border: 'hsl(var(--primary-border) / <alpha-value>)',
          'on-emerald': 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          muted: 'hsl(var(--success-muted) / <alpha-value>)',
          text: 'hsl(var(--success-text) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          muted: 'hsl(var(--warning-muted) / <alpha-value>)',
          text: 'hsl(var(--warning-text) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          muted: 'hsl(var(--destructive-muted) / <alpha-value>)',
          text: 'hsl(var(--destructive-text) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
