import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useState } from 'react';
import Dropdown from './Dropdown';
import RankingsButton from './RankingsButton';
import { Team, Tournament } from '../types';

const sampleData: Team[] = [
  {
    id: '98767991877340524',
    team_name: 'Cloud9',
    rank: 1,
    region: null,
    elo: 1163.7735983990156,
  },
  {
    id: '99294153824386385',
    team_name: 'Golden Guardians',
    rank: 2,
    region: null,
    elo: 1062.5207472791712,
  },
  {
    id: '98926509892121852',
    team_name: 'FlyQuest',
    rank: 3,
    region: null,
    elo: 1059.08254353179,
  },
  {
    id: '98767991860392497',
    team_name: 'TSM',
    rank: 4,
    region: null,
    elo: 1009.9364753632694,
  },
  {
    id: '98926509884398584',
    team_name: 'CLG',
    rank: 5,
    region: null,
    elo: 993.7235565323087,
  },
  {
    id: '98926509885559666',
    team_name: 'Team Liquid Honda',
    rank: 6,
    region: null,
    elo: 963.6182234370709,
  },
  {
    id: '103461966951059521',
    team_name: 'Evil Geniuses LG',
    rank: 7,
    region: null,
    elo: 957.103116751816,
  },
  {
    id: '99294153828264740',
    team_name: '100 Thieves',
    rank: 8,
    region: null,
    elo: 941.0037538296394,
  },
  {
    id: '98767991930907107',
    team_name: 'Immortals Progressive',
    rank: 9,
    region: null,
    elo: 931.0342522216347,
  },
  {
    id: '98926509883054987',
    team_name: 'Dignitas',
    rank: 10,
    region: null,
    elo: 918.2037326542838,
  },
];

const tournamentOptions: Tournament[] = [
  {
    name: 'LPL Spring 2023',
    dateStart: new Date(),
    dateEnd: new Date(),
    id: '1234',
  },
  {
    name: 'LCK Spring 2023',
    dateStart: new Date(),
    dateEnd: new Date(),
    id: '5678',
  },
  {
    name: 'LCK Spring 2023',
    dateStart: new Date(),
    dateEnd: new Date(),
    id: '0101',
  },
];

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
    cell: (info) => Math.floor(info.getValue()),
  }),
];

export default function RankingsDisplay() {
  const [data, setData] = useState(() => [...sampleData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const evenRowBg = (index: number): string => {
    return index % 2 == 0 ? 'bg-white' : 'bg-gold1 border border-gold2';
  };

  return (
    <div className='w-full bg-marble bg-cover px-[60px] pb-[58px] pt-[58px]'>
      <div className='flex max-w-[712px] items-center justify-between'>
        <RankingsButton name={'Global'} />
        <RankingsButton name={'Team'} />
        <Dropdown buttonName={'Tournament'} options={tournamentOptions} />
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
