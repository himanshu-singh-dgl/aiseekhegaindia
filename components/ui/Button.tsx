import Link from 'next/link';
import { cn } from '@/lib/cn';

type ButtonProps = React.ComponentProps<typeof Link> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
};

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-sm',
  secondary:
    'border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--code-bg)]',
  ghost: 'text-[var(--fg)] hover:bg-[var(--surface)]',
};

export function Button({
  className,
  variant = 'primary',
  external,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
    variants[variant],
    className,
  );

  if (external || (typeof href === 'string' && href.startsWith('http'))) {
    return (
      <a
        href={typeof href === 'string' ? href : '#'}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href ?? '#'} className={classes} {...props}>
      {children}
    </Link>
  );
}
