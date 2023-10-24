import { useState } from 'react';
import { Team } from '../types';
import Button from './Button';

interface TeamDropdownProps {
  regions: string[];
  teams: Team[];
  selectedTeams: Team[];
  onReset: () => void;
  onCompare: (teamList: Team[]) => void;
}

export default function TeamDropdown({
  regions,
  teams,
  selectedTeams,
  onReset,
  onCompare,
}: TeamDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedTeams, setCheckedTeams] = useState<Team[]>([]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const teamName = e.currentTarget.value;
    const isChecked = e.currentTarget.checked;

    setCheckedTeams((prevSelectedTeams) => {
      if (isChecked) {
        // If the checkbox is checked, add the team if not already in the list
        if (!prevSelectedTeams.some((team) => team.team_name === teamName)) {
          return [
            ...prevSelectedTeams,
            teams.find((team) => team.team_name === teamName)!,
          ];
        }
      } else {
        // If the checkbox is unchecked, remove the team if it's in the list
        return prevSelectedTeams.filter((team) => team.team_name !== teamName);
      }

      return prevSelectedTeams;
    });
  };

  const handleResetClick = () => {
    console.log('reset called');
    // Clear the checkedTeams array
    setCheckedTeams([]);

    // Uncheck all checkboxes by resetting their checked state
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setIsOpen(false);
    onReset();
  };

  const handleCompareClick = () => {
    console.log(checkedTeams);
    setIsOpen(false);
    onCompare(checkedTeams);
  };

  return (
    <div className='relative'>
      <button
        onClick={handleButtonClick} // Toggle the dropdown when the button is clicked
        className='px-3 font-display text-[20px] font-medium uppercase text-gold4'
      >
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
            <Button style='secondary' onClick={handleResetClick}>
              Reset
            </Button>
            <Button style='primary' onClick={handleCompareClick}>
              Compare
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
