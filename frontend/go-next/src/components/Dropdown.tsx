import { useEffect, useRef, useState } from 'react';

import upArrow from '/assets/Dropdown_UpArrow.svg';
import downArrow from '/assets/Dropdown_DownArrow.svg';

interface DropdownOption {
  id: string;
  name: string;
  value: string;
}

interface DropdownProps {
  buttonName: string;
  options: DropdownOption[];
  onOptionClick: (value: string) => void;
}

export default function Dropdown({
  buttonName,
  options,
  onOptionClick,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown container

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

  // const handleOptionClick = (name: string) => {
  //   // Pass the selected option's name up to the parent component
  //   onOptionClick(name);
  //   // Close the dropdown when an option is clicked
  //   setIsOpen(false);
  // };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = event.currentTarget.getAttribute('value');
    if (selectedValue) {
      console.log(selectedValue);
      // Pass the selected value to the onOptionClick function
      onOptionClick(selectedValue);
      // Close the dropdown when an option is clicked
      setIsOpen(false);
    }
  };

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
          className={` absolute z-10 w-full translate-y-[55%] list-none overflow-auto overflow-x-hidden border border-gold2 bg-white`}
        >
          {options.map((op) => {
            return (
              <li
                className='w-full px-8 py-4 hover:bg-stone-300'
                key={op.name}
                onClick={handleOptionClick}
                value={op.value}
              >
                {op.name}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}
