import { useState } from 'react';

interface DropdownProps {
  buttonName: string;
  options: Object[];
}

export default function Dropdown({ buttonName, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className='flex items-center gap-2 font-display text-[20px] font-medium uppercase text-gold4'>
        {buttonName}
        <img src='/assets/Dropdown_DownArrow.svg' width={16} />
      </button>

      {isOpen && (
        <ul className='w-inherit absolute z-10 bg-white'>
          {options.map((o) => {
            return <li id={o.id}>{o.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
