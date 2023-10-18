export type Team = {
  id: string;
  team_name: string;
  rank: number;
  region: null;
  elo: number;
};

export type Tournament = {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  id: string;
};
