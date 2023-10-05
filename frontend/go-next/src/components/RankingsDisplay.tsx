const sampleData = [
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

export default function RankingsDisplay() {
  return (
    <div className='bg-marble w-full bg-cover px-[60px] pb-[58px] pt-[58px]'>
      <ul>
        {sampleData.map((team) => {
          return <li id={team.id}>{team.team_name}</li>;
        })}
      </ul>
    </div>
  );
}
