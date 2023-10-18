import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className='rounded bg-teal px-4 py-2 font-bold uppercase text-white'>
      {children}
    </button>
  );
}
