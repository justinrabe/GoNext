import { useEffect, useRef, useState } from 'react';

import upArrow from '/assets/Dropdown_UpArrow.svg';
import downArrow from '/assets/Dropdown_DownArrow.svg';

interface DropdownOption {
  id: string;
  name: string;
}

interface DropdownProps {
  buttonName: string;
  options: DropdownOption[];
}

export default function Dropdown({ buttonName, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if click is outside of the dropdown container
      }
    };

    // Attach the click event listener
    document.addEventListener('mousedown', handleDocumentClick);

    // Cleanup - remove the listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className='relative flex w-[368px]  items-center justify-between px-8 hover:cursor-pointer'
    >
      <button className=' px-3 font-display text-[20px] font-medium uppercase text-gold4'>
        {buttonName}
      </button>
      <img src={`${isOpen ? upArrow : downArrow}`} width={16} height={26.182} />

      {isOpen && (
        <div
          className={`${
            isOpen ? 'visible' : 'invisible'
          } absolute z-10 w-full translate-y-[70%] list-none overflow-auto overflow-x-hidden border bg-white px-8`}
        >
          {options.map((op) => {
            return (
              <li className='py-4' id={op.id}>
                {op.name}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}
