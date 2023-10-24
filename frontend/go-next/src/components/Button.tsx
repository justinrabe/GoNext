import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  style: 'primary' | 'secondary';
  type?: 'submit' | null;
  onClick?: () => void;
}

export default function Button({
  children,
  style,
  type,
  onClick,
}: ButtonProps) {
  const buttonStyle =
    style === 'primary'
      ? ' bg-teal text-white'
      : style === 'secondary'
      ? 'border border-gold2 text-gold2'
      : '';

  const buttonType = type === 'submit' ? 'submit' : undefined;

  return (
    <button
      className={`rounded px-4 py-2 font-bold uppercase ${buttonStyle}`}
      type={buttonType}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
