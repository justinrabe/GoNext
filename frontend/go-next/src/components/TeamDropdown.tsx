import { useState, useRef, useEffect } from 'react';
import { Team } from '../types';
import Button from './Button';

interface TeamDropdownProps {
  regions: string[];
  teams: Team[];
}

export default function TeamDropdown({ regions, teams }: TeamDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const teamName = e.currentTarget.value;
    console.log(teamName);

    // Check if the teamName is already in the selectedTeams array
    if (selectedTeams.includes(teamName)) {
      // If it is, remove it
      setSelectedTeams((prevSelectedTeams) =>
        prevSelectedTeams.filter((name) => name !== teamName),
      );
    } else {
      // If it isn't, add it
      setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, teamName]);
      console.log(selectedTeams);
    }
  };

  const handleCompareClick = () => {
    // Log the selected teams to the console
    console.log('Selected Teams:', selectedTeams);
  };

  useEffect(() => {
    const handleDocumentClick = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div onClick={toggleDropdown} className='relative' ref={dropdownRef}>
      {selectedTeams}
      <button className=' px-3 font-display text-[20px] font-medium uppercase text-gold4'>
        Team
      </button>

      {isOpen && (
        <div className='absolute z-10 w-[1017px] translate-y-[4%] border border-gold2 bg-white p-12'>
          <div className='grid grid-cols-2'>
            {regions.map((r) => {
              return (
                <div key={r}>
                  <h2 className='font-bold text-zinc-700'>{r}</h2>
                  <div className='grid grid-cols-2'>
                    {teams
                      .filter((t) => t.region === r)
                      .map((team) => {
                        return (
                          <div
                            key={team.id}
                            className='flex items-center gap-2'
                          >
                            <input
                              type='checkbox'
                              name={team.team_name}
                              value={team.team_name}
                              onClick={handleCheckboxClick}
                              className='h-4 w-4 rounded border-4 border-neutral-600 hover:cursor-pointer'
                            />
                            <label htmlFor={team.team_name}>
                              {team.team_name}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className='my-8 border-grey' />

          <div className='flex w-full justify-end gap-6'>
            <Button style='secondary'>Reset</Button>
            <Button style='primary' onClick={handleCompareClick}>
              Compare
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
