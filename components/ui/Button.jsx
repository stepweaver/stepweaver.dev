export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const baseStyles = 'font-terminus rounded transition-colors';

  const variants = {
    primary: 'bg-terminal-green text-terminal hover:bg-terminal-green/90',
    secondary:
      'bg-terminal-light text-terminal-text hover:bg-terminal-light/90',
    outline:
      'border border-terminal-border text-terminal-text hover:bg-terminal-light',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}