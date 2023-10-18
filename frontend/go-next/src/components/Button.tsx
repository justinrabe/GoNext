import { ReactNode } from "react";

type buttonprops = {
  children : ReactNode
}

export default function Button({ children }: buttonprops) {
  return (
    <button className='rounded bg-teal px-4 py-2 font-bold uppercase text-white'>
      {children}
    </button>
  );
}
