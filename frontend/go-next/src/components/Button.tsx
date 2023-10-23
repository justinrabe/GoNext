import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type: 'primary' | 'secondary';
}

export default function Button({ children, type }: ButtonProps) {
  const buttonStyle =
    type === 'primary'
      ? ' bg-teal text-white'
      : type === 'secondary'
      ? 'border border-gold2 text-gold2'
      : '';

  return (
    <button className={`rounded px-4 py-2 font-bold uppercase ${buttonStyle}`}>
      {children}
    </button>
  );
}
