import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import RankingsButton from './RankingsButton';
import { Team, Tournament } from '../types';
import s3Client from '../utils/s3';
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import jsonToFormattedName from '../utils/jsonToFormattedName';
import streamToString from '../utils/streamToString';
import Button from './Button';

const columnHelper = createColumnHelper<Team>();
const columns = [
  columnHelper.accessor('rank', {
    header: 'Rank',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('team_name', {
    header: 'Team',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('region', {
    header: 'Region',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elo', {
    header: 'ELO',
    cell: (info) => info.getValue().toFixed(2),
  }),
];

export default function RankingsDisplay() {
  const [data, setData] = useState<Array<Team>>([]);
  const [tournamentList, setTournamentList] = useState([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTournamentList = async () => {
    const command = new ListObjectsV2Command({
      Bucket: 'go-next-data',
    });

    try {
      const data = await s3Client.send(command);

      const newTournamentList = data.Contents!.map((tournament) => {
        return {
          id: tournament.Key,
          name: jsonToFormattedName(tournament.Key),
          value: tournament.Key,
        };
      });

      console.log(newTournamentList);
      setTournamentList(newTournamentList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchObject = async (bucketObjectKey: string) => {
    const command = new GetObjectCommand({
      Bucket: 'go-next-data',
      Key: bucketObjectKey,
    });

    try {
      const data = await s3Client.send(command);
      // Convert the readable stream to text
      const objectData = await streamToString(data.Body as ReadableStream);
      // Now parse the text as JSON
      const jsonData = JSON.parse(objectData);
      console.log(jsonData);

      setData(jsonData);

      const regionList = (): string[] => {
        const uniqueRegions = new Set<string>();
        jsonData.forEach((team: Team) => {
          if (team.region) uniqueRegions.add(team.region);
        });
        return Array.from(uniqueRegions);
      };
      setRegions(regionList());

      const teamList = (): string[] => {
        const uniqueTeams = new Set<string>();
        jsonData.forEach((team: Team) => {
          if (team.team_name) uniqueTeams.add(team.team_name);
        });
        return Array.from(uniqueTeams);
      };
      setTeams(teamList);

      setLoading(false);
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTournamentList();
    fetchObject('final_global_rankings.json');
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const evenRowBg = (index: number): string => {
    return index % 2 == 0 ? 'bg-white' : 'bg-gold1 border border-gold2';
  };

  const handleGlobalBtnClick = () => {
    fetchObject('final_global_rankings.json');
  };

  const handleTeamBtnClick = () => {
    console.log('delete me');
  };

  const handleTournamentOptionClick = (e) => {
    const optionBucketKey = e.target.getAttribute('value');
    fetchObject(optionBucketKey);
  };

  return (
    <div className='w-full bg-marble bg-cover px-[60px] pb-[58px] pt-[58px]'>
      <div className='flex max-w-[712px] items-center justify-between'>
        <RankingsButton name={'Global'} onClick={handleGlobalBtnClick} />
        <TeamDropdown regions={regions} teams={teams} />
        <Dropdown
          buttonName={'Tournament'}
          options={tournamentList}
          onOptionClick={handleTournamentOptionClick}
        />
      </div>

      <table className='w-full text-left font-sans'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-7 uppercase text-[#555555]'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='border border-gold2'>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className={`${evenRowBg(index)}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-7'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TeamDropdownProps {
  regions: string[];
  teams: string[];
}

const TeamDropdown = ({ regions, teams }: TeamDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleDropdown} className='relative'>
      <button className=' px-3 font-display text-[20px] font-medium uppercase text-gold4'>
        Team
      </button>

      {isOpen && (
        <div className='absolute grid w-[1017px] grid-cols-2 border border-gold2 bg-white p-12'>
          {regions.map((r) => {
            return (
              <div>
                {r}
                <div>
                  {teams
                    .filter((t) => t.region === r)
                    .map((team) => {
                      return <li>{team}</li>;
                    })}
                </div>
              </div>
            );
          })}

          <div>
            <Button type='secondary'>Reset</Button>
            <Button type='primary'>Compare</Button>
          </div>
        </div>
      )}
    </div>
  );
};
